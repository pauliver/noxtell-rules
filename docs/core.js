/* The Noxtell role builder: its model, YAML writer, settings controls and
 * schema checker. No page here: ui.js draws it. This file runs in a browser
 * and, for the tests, in a bare JavaScript engine with the same two
 * libraries the page loads.
 *
 * The model is one mode file being built: its roles (and later its teams,
 * setup table, night and levers), each written out as the mode file writes
 * it. A role is { id, team, persona, tags, verbs: [use], params: {} }, a
 * use the verb use as written (verb first), params what the file writes
 * under options.roles.<id>.
 */
(function (root) {
  'use strict';

  var NB = {};

  // ------------------------------------------------------------ schema

  /** The node a $ref names, inside the schema. */
  function deref(schema, node, seen) {
    seen = seen || 0;
    while (node && typeof node === 'object' && typeof node.$ref === 'string') {
      if (seen++ > 64) return {};
      var ref = node.$ref;
      var hash = ref.indexOf('#');
      var ptr = hash < 0 ? '' : ref.slice(hash + 1);
      node = pointer(schema, ptr);
    }
    return node;
  }

  /** The node at a JSON pointer ("/properties/roles") in the schema. */
  function pointer(schema, ptr) {
    if (!ptr) return schema;
    var parts = ptr.split('/').slice(1);
    var n = schema;
    for (var i = 0; i < parts.length && n; i++) {
      var k = parts[i].replace(/~1/g, '/').replace(/~0/g, '~');
      n = n[k];
    }
    return n;
  }
  NB.deref = deref;
  NB.pointer = pointer;

  /** The branches of an anyOf or oneOf, nested ones flattened. */
  function branches(schema, node) {
    var out = [];
    (function add(list) {
      for (var i = 0; i < list.length; i++) {
        var b = deref(schema, list[i]);
        if (b && (b.anyOf || b.oneOf) && Object.keys(b).length === 1) {
          add(b.anyOf || b.oneOf);
        } else {
          out.push(b);
        }
      }
    })(node.anyOf || node.oneOf || []);
    return out;
  }

  function isSizeMap(n) {
    return !!(n && n.type === 'object' && n.propertyNames &&
      n.propertyNames.pattern === '^[1-9][0-9]*$');
  }

  /**
   * How a value the node describes is set in the page: a flag, a number,
   * a choice, a text, a size map of one of those, one or the other, an
   * object of fields, or YAML written by hand.
   */
  NB.controlFor = function (schema, node, stack) {
    node = deref(schema, node);
    if (!node || typeof node !== 'object') return { type: 'yaml' };
    // A schema that holds itself (a condition of conditions) is written as
    // YAML.
    stack = stack || [];
    if (stack.indexOf(node) >= 0) return { type: 'yaml', recursive: true };
    stack = stack.concat([node]);
    if (node.anyOf || node.oneOf) {
      var bs = branches(schema, node);
      var nullable = bs.some(function (b) { return b.type === 'null'; });
      var rest = bs.filter(function (b) { return b.type !== 'null'; });
      var maps = rest.filter(isSizeMap);
      var plainOnes = rest.filter(function (b) { return !isSizeMap(b); });
      var seen = {};
      var kinds = [];
      plainOnes.forEach(function (b) {
        var c = NB.controlFor(schema, b, stack);
        var key = JSON.stringify(c);
        if (!seen[key]) { seen[key] = true; kinds.push(c); }
      });
      if (maps.length === 1 && kinds.length === 1) {
        return { type: 'either', one: kinds[0], map: NB.controlFor(schema, maps[0], stack) };
      }
      if (kinds.some(function (k) { return k.recursive; })) return { type: 'yaml', recursive: true };
      if (maps.length === 0 && kinds.length === 1) {
        var only = kinds[0];
        if (nullable) only = Object.assign({}, only, { nullable: true });
        return only;
      }
      if (maps.length === 0 && kinds.every(function (k) { return k.type === 'enum'; })) {
        return { type: 'enum', values: [].concat.apply([], kinds.map(function (k) { return k.values; })) };
      }
      return { type: 'yaml' };
    }
    if (node.enum) return { type: 'enum', values: node.enum.slice() };
    if (node.const !== undefined) return { type: 'enum', values: [node.const] };
    if (node.type === 'boolean') return { type: 'bool' };
    if (node.type === 'integer' || node.type === 'number') {
      return { type: 'int', min: node.minimum, max: node.maximum };
    }
    if (node.type === 'string') return { type: 'text', pattern: node.pattern };
    if (isSizeMap(node)) {
      var of = deref(schema, node.additionalProperties);
      var c = NB.controlFor(schema, of, stack);
      return { type: 'sizeMap', of: c.nullable ? Object.assign({}, c, { nullable: undefined }) : c, nullable: !!c.nullable };
    }
    if (node.type === 'object' && node.properties && node.additionalProperties === false) {
      var fields = {};
      var recursive = false;
      Object.keys(node.properties).forEach(function (k) {
        fields[k] = NB.controlFor(schema, node.properties[k], stack);
        if (fields[k].recursive) recursive = true;
      });
      if (recursive) return { type: 'yaml', recursive: true };
      return { type: 'object', fields: fields };
    }
    return { type: 'yaml' };
  };

  /** The schema of a verb's use (its def), or null. */
  NB.verbDef = function (schema, verb) {
    var d = schema.$defs && schema.$defs['verb.' + verb];
    return d ? deref(schema, d) : null;
  };

  /** The schema of the role parameter p, or null. */
  NB.paramDef = function (schema, p) {
    var rp = schema.$defs && deref(schema, schema.$defs.roleParams);
    return rp && rp.properties && rp.properties[p] ? rp.properties[p] : null;
  };

  // ------------------------------------------------------------- blocks

  /** The block of kind ("verbs", "personas", ...) named name, or null. */
  NB.block = function (blocks, kind, name) {
    var list = (blocks.library && blocks.library[kind]) || [];
    for (var i = 0; i < list.length; i++) if (list[i].name === name) return list[i];
    return null;
  };

  /** The keys a use of verb may write beside "verb": its use keys, its
   * arguments, "id", and "d248" when its result names several players. */
  NB.useFields = function (blocks, schema, verb) {
    var b = NB.block(blocks, 'verbs', verb);
    var def = NB.verbDef(schema, verb);
    var props = (def && def.properties) || {};
    var useKeys = (b && b.useKeys) || [];
    var args = Object.keys((b && b.args) || {});
    var out = [];
    ['id'].concat(useKeys, args).forEach(function (k) {
      if (props[k] && out.indexOf(k) < 0) out.push(k);
    });
    if (b && b.result === 'several' && props.d248) out.push('d248');
    return out;
  };

  /** The parameters a role can be given (options.roles.<id>), each with
   * the blocks that read it: every role's "unique", its verbs', its
   * persona's. Only those the schema knows. */
  NB.roleParams = function (blocks, schema, role) {
    var out = [];
    var from = {};
    function add(name, what) {
      if (!NB.paramDef(schema, name)) return;
      if (!from[name]) { from[name] = []; out.push(name); }
      if (from[name].indexOf(what) < 0) from[name].push(what);
    }
    add('unique', 'every role');
    role.verbs.forEach(function (u) {
      var b = NB.block(blocks, 'verbs', u.verb);
      Object.keys((b && b.params) || {}).forEach(function (p) { add(p, u.verb); });
    });
    if (role.persona) {
      var pb = NB.block(blocks, 'personas', role.persona);
      Object.keys((pb && pb.params) || {}).forEach(function (p) { add(p, role.persona); });
    }
    return out.map(function (p) { return { name: p, from: from[p] }; });
  };

  /** The teams the page offers: each published mode's, once by id. */
  NB.teams = function (blocks) {
    var out = [];
    var seen = {};
    (blocks.examples || []).forEach(function (m) {
      (m.teams || []).forEach(function (t) {
        if (seen[t.id]) return;
        seen[t.id] = true;
        out.push({ id: t.id, alignment: t.alignment, mode: m.mode });
      });
    });
    return out;
  };

  // -------------------------------------------------------------- model

  NB.newRole = function () {
    return { id: '', team: '', persona: null, tags: [], verbs: [], params: {} };
  };

  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  /** A published role as a model: its entry and its options.roles. */
  NB.exampleRole = function (blocks, mode, id) {
    var m = (blocks.examples || []).filter(function (e) { return e.mode === mode; })[0];
    if (!m) return null;
    var entry = (m.roles || []).filter(function (r) { return r && r.id === id; })[0];
    if (!entry) return null;
    var role = NB.newRole();
    role.id = entry.id;
    role.team = entry.team || '';
    role.persona = entry.persona || null;
    role.tags = clone(entry.tags || []);
    role.verbs = (entry.verbs || []).map(function (u) {
      return typeof u === 'string' ? { verb: u } : clone(u);
    });
    Object.keys(entry).forEach(function (k) {
      if (['id', 'team', 'persona', 'tags', 'verbs'].indexOf(k) < 0) {
        role.extra = role.extra || {};
        role.extra[k] = clone(entry[k]);
      }
    });
    var opts = m.options && m.options.roles && m.options.roles[id];
    role.params = clone(opts || {});
    return role;
  };

  /** Adds the block kind/name to the role: a verb as a new use (with
   * "d248: owed" when its result names several players), a persona as the
   * role's persona. Returns the role. */
  NB.addBlock = function (blocks, role, kind, name) {
    var b = NB.block(blocks, kind, name);
    if (!b) throw new Error('no ' + kind + ' block ' + name);
    if (kind === 'verbs') {
      var use = { verb: name };
      if (b.result === 'several') use.d248 = 'owed';
      role.verbs.push(use);
    } else if (kind === 'personas') {
      role.persona = name;
    } else {
      throw new Error('a role takes verbs and a persona, not ' + kind);
    }
    return role;
  };

  NB.removeUse = function (role, i) { role.verbs.splice(i, 1); return role; };

  NB.moveUse = function (role, i, by) {
    var j = i + by;
    if (j < 0 || j >= role.verbs.length) return role;
    var u = role.verbs.splice(i, 1)[0];
    role.verbs.splice(j, 0, u);
    return role;
  };

  /** Sets (or with undefined clears) a key of the use at i. */
  NB.setUseKey = function (role, i, key, value) {
    var u = role.verbs[i];
    if (value === undefined || value === '') delete u[key]; else u[key] = value;
    return role;
  };

  /** Sets (or with undefined clears) the role parameter p. */
  NB.setParam = function (role, p, value) {
    if (value === undefined || value === '') delete role.params[p]; else role.params[p] = value;
    return role;
  };

  /** Drops the parameters no block of the role reads any more. */
  NB.pruneParams = function (blocks, schema, role) {
    var keep = NB.roleParams(blocks, schema, role).map(function (p) { return p.name; });
    Object.keys(role.params).forEach(function (p) {
      if (keep.indexOf(p) < 0) delete role.params[p];
    });
    return role;
  };

  var useOrder = ['verb', 'id', 'step', 'when', 'targets', 'uses', 'pool'];

  /** The role's entry as the mode file's roles: list writes it. */
  NB.roleEntry = function (role) {
    var e = {};
    e.id = role.id;
    e.team = role.team;
    if (role.extra) Object.keys(role.extra).forEach(function (k) { e[k] = clone(role.extra[k]); });
    if (role.persona) e.persona = role.persona;
    if (role.tags && role.tags.length) e.tags = role.tags.slice();
    if (role.verbs.length) {
      e.verbs = role.verbs.map(function (u) {
        var o = {};
        useOrder.forEach(function (k) { if (u[k] !== undefined) o[k] = clone(u[k]); });
        Object.keys(u).forEach(function (k) {
          if (useOrder.indexOf(k) < 0 && k !== 'd248') o[k] = clone(u[k]);
        });
        if (u.d248 !== undefined) o.d248 = u.d248;
        return o;
      });
    }
    return e;
  };

  /** The part of a mode file the role writes: its entry under roles:, and
   * its parameters under options.roles.<id> when it has any. */
  NB.fragment = function (role) {
    var f = { roles: [NB.roleEntry(role)] };
    if (Object.keys(role.params).length) {
      var p = {};
      p[role.id] = clone(role.params);
      f.options = { roles: p };
    }
    return f;
  };

  // --------------------------------------------------------------- YAML

  var plainScalar = /^[A-Za-z_][A-Za-z0-9_.]*$/;
  var reserved = /^(?:true|false|yes|no|on|off|null|y|n|~)$/i;

  function scalar(v) {
    if (v === null) return 'null';
    if (typeof v === 'boolean' || typeof v === 'number') return String(v);
    var s = String(v);
    if (plainScalar.test(s) && !reserved.test(s)) return s;
    return "'" + s.replace(/'/g, "''") + "'";
  }

  function key(k) {
    return plainScalar.test(k) && !reserved.test(k) ? k : "'" + String(k).replace(/'/g, "''") + "'";
  }

  function isScalar(v) { return v === null || typeof v !== 'object'; }

  function flow(v) {
    if (isScalar(v)) return scalar(v);
    if (Array.isArray(v)) return '[' + v.map(flow).join(', ') + ']';
    return '{' + Object.keys(v).map(function (k) { return key(k) + ': ' + flow(v[k]); }).join(', ') + '}';
  }

  /** Whether v is written on one line: a scalar, or a list or map of
   * scalars (one level of maps inside) short enough. */
  function flowFits(v, room) {
    if (isScalar(v)) return true;
    var vals = Array.isArray(v) ? v : Object.keys(v).map(function (k) { return v[k]; });
    var flat = vals.every(function (x) {
      return isScalar(x) || (!Array.isArray(x) && Object.keys(x).every(function (k) { return isScalar(x[k]); }));
    });
    return flat && flow(v).length <= room;
  }

  /** v as block YAML lines at indent ind. */
  function lines(v, ind) {
    var pad = new Array(ind + 1).join(' ');
    var out = [];
    if (Array.isArray(v)) {
      if (!v.length) return [pad + '[]'];
      v.forEach(function (x) {
        if (isScalar(x) || flowFits(x, 70 - ind)) {
          out.push(pad + '- ' + flow(x));
        } else if (Array.isArray(x)) {
          var inner = lines(x, ind + 2);
          out.push(pad + '- ' + inner[0].trim());
          out.push.apply(out, inner.slice(1));
        } else {
          var sub = lines(x, ind + 2);
          out.push(pad + '- ' + sub[0].slice(ind + 2));
          out.push.apply(out, sub.slice(1));
        }
      });
      return out;
    }
    var keys = Object.keys(v);
    if (!keys.length) return [pad + '{}'];
    keys.forEach(function (k) {
      var x = v[k];
      if (isScalar(x) || flowFits(x, 70 - ind - k.length)) {
        out.push(pad + key(k) + ': ' + flow(x));
      } else {
        out.push(pad + key(k) + ':');
        out.push.apply(out, lines(x, ind + 2));
      }
    });
    return out;
  }

  /** v as YAML text (block style, small lists and maps on one line). */
  NB.toYaml = function (v) { return lines(v, 0).join('\n') + '\n'; };

  // ------------------------------------------------------------ checking

  var idPattern = '^[a-z][a-z0-9_]*$';

  function typeOf(v) {
    if (v === null) return 'null';
    if (Array.isArray(v)) return 'array';
    if (typeof v === 'number') return Number.isInteger(v) ? 'integer' : 'number';
    return typeof v;
  }

  function typeWords(t) {
    return {
      integer: 'a whole number', number: 'a number', string: 'a text',
      boolean: 'true or false', object: 'a map of keys', array: 'a list', 'null': 'null'
    }[t] || t;
  }

  function fitsType(t, v) {
    var vt = typeOf(v);
    if (Array.isArray(t)) return t.some(function (x) { return fitsType(x, v); });
    if (t === 'number') return vt === 'number' || vt === 'integer';
    return vt === t;
  }

  function list(vals, most) {
    most = most || 14;
    var shown = vals.slice(0, most).map(function (x) { return JSON.stringify(x); }).join(', ');
    return vals.length > most ? shown + ' and ' + (vals.length - most) + ' more' : shown;
  }

  function patternWords(p) {
    if (p === idPattern) return 'an id: lowercase letters, digits and _, starting with a letter';
    if (p === '^[1-9][0-9]*$') return 'a table size, a whole number from 1';
    return 'text matching ' + p;
  }

  /** What one branch of an anyOf is, in a few words. */
  function describe(schema, n) {
    n = deref(schema, n);
    if (!n) return 'anything';
    if (n.const !== undefined) return JSON.stringify(n.const);
    if (n.enum) return 'one of ' + list(n.enum, 6);
    if (isSizeMap(n)) return 'a size map';
    if (n.type === 'object' && n.properties && n.properties.verb && n.properties.verb.const) {
      return 'a use of ' + n.properties.verb.const;
    }
    if (n.type) return typeWords(n.type);
    if (n.anyOf || n.oneOf) return branches(schema, n).map(function (b) { return describe(schema, b); }).join(' or ');
    return 'a value';
  }

  /** The keys whose const tells an object's branches apart. */
  function discriminator(schema, bs) {
    var objs = bs.filter(function (b) { return b && b.properties; });
    if (objs.length < 2) return null;
    var first = objs[0].properties;
    var keys = Object.keys(first).filter(function (k) {
      return objs.every(function (b) {
        var p = b.properties[k] && deref(schema, b.properties[k]);
        return p && (p.const !== undefined || (p.enum && p.enum.length <= 4));
      });
    });
    return keys[0] || null;
  }

  /**
   * Why value isn't what node says, as errors { path: [keys and indexes],
   * message, key: whether the path ends at a key that shouldn't be there }.
   * ajv decides valid or not; this says where and why, choosing the one
   * branch of an anyOf the value means (a verb use by its verb, a type by
   * its type).
   */
  function explain(schema, node, value, path) {
    node = deref(schema, node);
    if (node === true || !node || typeof node !== 'object') return [];
    var errs = [];
    function err(p, message, isKey) { errs.push({ path: p, message: message, key: !!isKey }); }

    if (node.anyOf || node.oneOf) {
      var bs = branches(schema, node);
      for (var i = 0; i < bs.length; i++) {
        if (!explain(schema, bs[i], value, path).length) return [];
      }
      if (typeOf(value) === 'object') {
        var d = discriminator(schema, bs);
        if (d && value[d] !== undefined) {
          var chosen = bs.filter(function (b) {
            var p = b.properties && b.properties[d] && deref(schema, b.properties[d]);
            return p && (p.const === value[d] || (p.enum && p.enum.indexOf(value[d]) >= 0));
          });
          if (chosen.length === 1) return explain(schema, chosen[0], value, path);
          if (!chosen.length) {
            var names = [];
            bs.forEach(function (b) {
              var p = b.properties && b.properties[d] && deref(schema, b.properties[d]);
              if (p && p.const !== undefined) names.push(p.const);
            });
            err(path.concat([d]), JSON.stringify(value[d]) + ' is not a ' + d +
              ' in the block list (' + list(names) + ')');
            return errs;
          }
        }
      }
      var typed = bs.filter(function (b) {
        if (b.type) return fitsType(b.type, value);
        if (b.enum) return b.enum.some(function (x) { return typeOf(x) === typeOf(value); });
        if (b.const !== undefined) return typeOf(b.const) === typeOf(value);
        return true;
      });
      if (typed.length === 1) return explain(schema, typed[0], value, path);
      if (typed.length > 1) {
        var best = null;
        typed.forEach(function (b) {
          var e = explain(schema, b, value, path);
          if (!best || e.length < best.length) best = e;
        });
        return best;
      }
      err(path, 'must be ' + bs.map(function (b) { return describe(schema, b); }).join(', or '));
      return errs;
    }

    if (node.const !== undefined && value !== node.const) {
      err(path, 'must be ' + JSON.stringify(node.const));
      return errs;
    }
    if (node.enum && node.enum.indexOf(value) < 0) {
      err(path, 'must be one of ' + list(node.enum));
      return errs;
    }
    if (node.type && !fitsType(node.type, value)) {
      err(path, 'must be ' + (Array.isArray(node.type) ? node.type.map(typeWords).join(' or ') : typeWords(node.type)) +
        ', not ' + typeWords(typeOf(value)));
      return errs;
    }
    var t = typeOf(value);
    if (t === 'string' && node.pattern && !new RegExp(node.pattern).test(value)) {
      err(path, 'must be ' + patternWords(node.pattern));
    }
    if ((t === 'integer' || t === 'number')) {
      if (node.minimum !== undefined && value < node.minimum) err(path, 'must be at least ' + node.minimum);
      if (node.maximum !== undefined && value > node.maximum) err(path, 'must be at most ' + node.maximum);
    }
    if (t === 'object') {
      var props = node.properties || {};
      (node.required || []).forEach(function (k) {
        if (value[k] === undefined) err(path, 'needs the key ' + JSON.stringify(k));
      });
      var n = Object.keys(value).length;
      if (node.minProperties !== undefined && n < node.minProperties) err(path, 'needs at least ' + node.minProperties + ' key' + (node.minProperties === 1 ? '' : 's'));
      if (node.maxProperties !== undefined && n > node.maxProperties) err(path, 'takes at most ' + node.maxProperties + ' key' + (node.maxProperties === 1 ? '' : 's'));
      Object.keys(value).forEach(function (k) {
        var p = path.concat([k]);
        if (node.propertyNames && node.propertyNames.pattern && !new RegExp(node.propertyNames.pattern).test(k)) {
          err(p, JSON.stringify(k) + ' must be ' + patternWords(node.propertyNames.pattern), true);
          return;
        }
        if (props[k] !== undefined) {
          errs.push.apply(errs, explain(schema, props[k], value[k], p));
        } else if (node.additionalProperties === false) {
          var known = Object.keys(props);
          err(p, JSON.stringify(k) + ' is not a key here' +
            (known.length ? ' (its keys: ' + known.join(', ') + ')' : ''), true);
        } else if (node.additionalProperties && typeof node.additionalProperties === 'object') {
          errs.push.apply(errs, explain(schema, node.additionalProperties, value[k], p));
        }
      });
    }
    if (t === 'array') {
      if (node.minItems !== undefined && value.length < node.minItems) err(path, 'needs at least ' + node.minItems + ' item' + (node.minItems === 1 ? '' : 's'));
      if (node.maxItems !== undefined && value.length > node.maxItems) err(path, 'takes at most ' + node.maxItems + ' item' + (node.maxItems === 1 ? '' : 's'));
      if (node.uniqueItems) {
        var seen = {};
        value.forEach(function (x, i) {
          var s = JSON.stringify(x);
          if (seen[s]) err(path.concat([i]), 'is already in the list');
          seen[s] = true;
        });
      }
      var prefix = node.prefixItems || [];
      value.forEach(function (x, i) {
        var s = i < prefix.length ? prefix[i] : node.items;
        if (s === false && i >= prefix.length) err(path.concat([i]), 'is one item too many');
        else if (s) errs.push.apply(errs, explain(schema, s, x, path.concat([i])));
      });
    }
    return errs;
  }
  NB.explain = explain;

  /** The schema a fragment of a mode file is checked with: any of the mode
   * file's top-level keys, each as the mode file has it. */
  NB.fragmentSchema = function (schema) {
    var props = {};
    Object.keys(schema.properties || {}).forEach(function (k) {
      props[k] = { $ref: '#/properties/' + k };
    });
    return { type: 'object', properties: props, additionalProperties: false };
  };

  /**
   * A checker for the schema with the validator class Ajv (ajv's draft
   * 2020-12 build): check(doc) gives { whole, ok, errors }. A document
   * with a "schema" key is a whole mode file; any other is a fragment (a
   * role's roles: and options:, for one). ajv decides whether it passes;
   * explain says where and why, and ajv's own errors are shown when it
   * can't.
   */
  NB.checker = function (Ajv, schema) {
    var ajv = new Ajv({ allErrors: true, strict: false });
    ajv.addSchema(schema);
    var id = schema.$id;
    var whole = ajv.getSchema(id);
    var frag = NB.fragmentSchema(schema);
    var fragRefs = JSON.parse(JSON.stringify(frag).replace(/"#\/properties\//g, '"' + id + '#/properties/'));
    var fragment = ajv.compile(fragRefs);
    return {
      check: function (doc) {
        var isWhole = !!(doc && typeof doc === 'object' && !Array.isArray(doc) && doc.schema !== undefined);
        var v = isWhole ? whole : fragment;
        if (v(doc)) return { whole: isWhole, ok: true, errors: [] };
        var errs = explain(schema, isWhole ? schema : frag, doc, []);
        if (!errs.length) {
          errs = (v.errors || []).map(function (e) {
            var p = e.instancePath.split('/').slice(1).map(function (s) {
              s = s.replace(/~1/g, '/').replace(/~0/g, '~');
              return /^[0-9]+$/.test(s) ? Number(s) : s;
            });
            if (e.params && e.params.additionalProperty !== undefined) p.push(e.params.additionalProperty);
            return { path: p, message: e.message, key: !!(e.params && e.params.additionalProperty !== undefined) };
          });
        }
        return { whole: isWhole, ok: false, errors: errs };
      }
    };
  };

  // ----------------------------------------------------------- locating

  /** A line's entries: each "- " opens an item one level in; what is
   * left is the line's key or value. */
  function entries(text) {
    var out = [];
    text.split('\n').forEach(function (raw, i) {
      var line = stripComment(raw);
      if (!line.trim()) return;
      if (/^(?:---|\.\.\.)\s*$/.test(line)) return;
      var ind = line.length - line.replace(/^ +/, '').length;
      var rest = line.slice(ind);
      while (rest === '-' || rest.indexOf('- ') === 0) {
        out.push({ line: i + 1, indent: ind, dash: true, col: ind + 1 });
        var after = rest.slice(1);
        var sp = after.length - after.replace(/^ +/, '').length;
        ind += 1 + sp;
        rest = after.slice(sp);
      }
      if (rest) out.push({ line: i + 1, indent: ind, dash: false, text: rest, col: ind + 1 });
    });
    return out;
  }

  /** The line without a # comment (one outside quotes, after a space). */
  function stripComment(line) {
    var q = null;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") q = c;
      else if (c === '#' && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i).replace(/\s+$/, '');
    }
    return line;
  }

  var keyAt = /^(?:"((?:[^"\\]|\\.)*)"|'((?:[^']|'')*)'|([^:#{}\[\],'"][^:#{}\[\],]*?))\s*:(?:\s|$)/;

  function keyOf(text) {
    var m = keyAt.exec(text);
    if (!m) return null;
    return m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2].replace(/''/g, "'") : m[3].trim();
  }

  /** In the flow text s (from "[" or "{" at offset at), the offset of
   * item i or key k, or -1. */
  function inFlow(s, at, seg) {
    var open = s[at];
    if (open !== '[' && open !== '{') return -1;
    var depth = 0, q = null, item = 0, start = at + 1;
    function hit(from) {
      var j = from;
      while (j < s.length && s[j] === ' ') j++;
      if (typeof seg === 'number') return item === seg ? j : -1;
      var k = keyOf(s.slice(j));
      return k === String(seg) ? j : -1;
    }
    for (var i = at; i < s.length; i++) {
      var c = s[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === '[' || c === '{') { depth++; if (depth === 1) start = i + 1; continue; }
      if (c === ']' || c === '}') { depth--; if (depth === 0) { var h = hit(start); return h; } continue; }
      if (c === ',' && depth === 1) {
        var found = hit(start);
        if (found >= 0) return found;
        item++;
        start = i + 1;
      }
    }
    return -1;
  }

  /** Where the value at path (keys and indexes) is written in the YAML
   * text: { line, column }, from 1; the nearest place found when the text
   * doesn't say it in block style. */
  NB.locate = function (text, path) {
    var es = entries(text);
    var lo = 0, hi = es.length;
    var at = { line: 1, column: 1 };
    var flowText = null, flowAt = 0;
    for (var s = 0; s < path.length; s++) {
      var seg = path[s];
      if (flowText !== null) {
        var off = inFlow(flowText.text, flowAt, seg);
        if (off < 0) return at;
        at = { line: flowText.line, column: flowText.col + off };
        var rest = flowText.text.slice(off);
        if (typeof seg !== 'number') {
          var colon = rest.indexOf(':');
          var v = colon + 1;
          while (v < rest.length && rest[v] === ' ') v++;
          flowAt = off + v;
        } else {
          flowAt = off;
        }
        continue;
      }
      if (lo >= hi) return at;
      var base = Infinity;
      for (var i = lo; i < hi; i++) base = Math.min(base, es[i].indent);
      var found = -1;
      if (typeof seg === 'number') {
        var n = 0;
        for (i = lo; i < hi; i++) {
          if (es[i].indent === base && es[i].dash) { if (n++ === seg) { found = i; break; } }
        }
        if (found < 0) {
          // A flow list on the parent's line.
          var parent = lo > 0 ? es[lo - 1] : null;
          if (parent && parent.text) {
            var c = parent.text.indexOf(': ');
            var start = c < 0 ? 0 : c + 2;
            while (parent.text[start] === ' ') start++;
            flowText = parent; flowAt = start; s--; continue;
          }
          return at;
        }
      } else {
        for (i = lo; i < hi; i++) {
          if (es[i].indent === base && !es[i].dash && keyOf(es[i].text) === String(seg)) { found = i; break; }
        }
        if (found < 0) {
          var p2 = lo > 0 ? es[lo - 1] : null;
          if (p2 && p2.text && /:\s*[\[{]/.test(p2.text)) {
            var c2 = p2.text.indexOf(':') + 1;
            while (p2.text[c2] === ' ') c2++;
            flowText = p2; flowAt = c2; s--; continue;
          }
          return at;
        }
      }
      var e = es[found];
      at = { line: e.line, column: e.col };
      if (e.dash && s + 1 < path.length) {
        // An item written in flow style: "- {id: x, verbs: [...]}".
        var item = es[found + 1];
        if (item && !item.dash && item.line === e.line && /^[\[{]/.test(item.text)) {
          flowText = item; flowAt = 0;
          at = { line: item.line, column: item.col };
          continue;
        }
      }
      var end = found + 1;
      while (end < hi && es[end].indent > e.indent) end++;
      if (!e.dash) {
        var colon2 = e.text.indexOf(':');
        var val = e.text.slice(colon2 + 1).trim();
        if (val && (val[0] === '[' || val[0] === '{')) {
          if (s + 1 < path.length) {
            var vs = colon2 + 1;
            while (e.text[vs] === ' ') vs++;
            flowText = e; flowAt = vs;
            continue;
          }
        }
      }
      lo = found + 1;
      hi = end;
    }
    return at;
  };

  /**
   * Checks the YAML text with the checker: { ok, whole, errors: [{ line,
   * column, path, message }] }, each error at the line that writes it; a
   * text that isn't YAML gives the parser's error at its line.
   */
  NB.checkText = function (text, yaml, checker) {
    var doc;
    try {
      doc = yaml.load(text);
    } catch (e) {
      var mark = e.mark || {};
      return {
        ok: false, whole: false, errors: [{
          line: (mark.line || 0) + 1, column: (mark.column || 0) + 1, path: [],
          message: 'not YAML: ' + (e.reason || e.message)
        }]
      };
    }
    if (doc === undefined || doc === null) {
      return { ok: false, whole: false, errors: [{ line: 1, column: 1, path: [], message: 'empty: paste a mode file, or a part of one such as a role' }] };
    }
    var r = checker.check(doc);
    return {
      ok: r.ok, whole: r.whole,
      errors: r.errors.map(function (e) {
        var at = NB.locate(text, e.path);
        return { line: at.line, column: at.column, path: e.path, message: e.message };
      })
    };
  };

  /** A path as the file names it: roles[0].verbs[1].pool. */
  NB.pathText = function (path) {
    var s = '';
    path.forEach(function (p) { s += typeof p === 'number' ? '[' + p + ']' : (s ? '.' : '') + p; });
    return s || '(the file)';
  };

  root.NoxtellBuilder = NB;
})(typeof globalThis !== 'undefined' ? globalThis : this);
