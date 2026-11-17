/* The Noxtell role builder's page: the blocks, the role card and the YAML,
 * drawn from the block list (data/blocks.js) and the mode-file schema
 * (data/schema.js), with the model and the checker in core.js. */
(function () {
  'use strict';

  var NB = window.NoxtellBuilder;
  var blocks = window.NOXTELL_BLOCKS;
  var schema = window.NOXTELL_SCHEMA;
  var $ = function (id) { return document.getElementById(id); };

  var state = {
    kind: 'verbs',
    role: NB.newRole(),
    open: null,
    checker: null,
    yaml: '',
    result: null
  };

  // The checker needs the two libraries from the CDN; the builder works
  // without them, and says so.
  try {
    if (window.ajv2020 && window.jsyaml) {
      state.checker = NB.checker(window.ajv2020.default || window.ajv2020, schema);
      $('lib-status').textContent = 'Checker ready: js-yaml 4.1.1 and ajv 8.17.1, with the schema of rules ' + blocks.version + '.';
    } else {
      $('lib-status').textContent = 'The checker\'s libraries didn\'t load (offline?): the YAML is still built, but not checked.';
    }
  } catch (e) {
    $('lib-status').textContent = 'The checker couldn\'t start: ' + e.message;
  }

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'cls') e.className = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== undefined && attrs[k] !== null && attrs[k] !== false) e.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  /** Markdown's `code` spans as <code>, everything else as text. */
  function words(text) {
    var span = el('span');
    String(text || '').split('`').forEach(function (part, i) {
      span.appendChild(i % 2 ? el('code', { text: part }) : document.createTextNode(part));
    });
    return span;
  }

  // -------------------------------------------------------------- the palette

  var paletteKinds = [['verbs', 'Verbs'], ['personas', 'Personas']];

  function drawKinds() {
    var box = $('kinds');
    box.textContent = '';
    paletteKinds.forEach(function (k) {
      box.appendChild(el('button', {
        type: 'button', role: 'tab', 'aria-selected': String(state.kind === k[0]),
        text: k[1] + ' (' + (blocks.library[k[0]] || []).length + ')',
        onclick: function () { state.kind = k[0]; state.open = null; drawKinds(); drawPalette(); }
      }));
    });
  }

  function facts(kind, b) {
    if (kind !== 'verbs') return '';
    var f = [b.kind];
    if (b.result && b.result !== 'none') f.push('result: ' + b.result);
    var used = Object.keys(b.usedBy || {}).map(function (m) { return m + ': ' + b.usedBy[m].join(', '); });
    if (used.length) f.push(used.join('; '));
    return f.join(' · ');
  }

  function drawPalette() {
    var ul = $('blocks');
    ul.textContent = '';
    var q = $('search').value.trim().toLowerCase();
    (blocks.library[state.kind] || []).forEach(function (b) {
      var hay = (b.name + ' ' + (b.words || '')).toLowerCase();
      if (q && hay.indexOf(q) < 0) return;
      var open = state.open === b.name;
      var li = el('li', {
        cls: 'block', draggable: 'true', tabindex: '0', 'aria-expanded': String(open),
        'data-kind': state.kind, 'data-name': b.name,
        ondragstart: function (ev) {
          ev.dataTransfer.setData('text/plain', state.kind + ':' + b.name);
          ev.dataTransfer.effectAllowed = 'copy';
        },
        onclick: function (ev) {
          if (ev.target.classList.contains('add')) return;
          state.open = open ? null : b.name;
          drawPalette();
        },
        onkeydown: function (ev) {
          if (ev.key === 'Enter') { add(state.kind, b.name); ev.preventDefault(); }
        }
      }, [
        el('div', {}, [el('span', { cls: 'name', text: b.name }), el('span', { cls: 'chip', text: state.kind === 'verbs' ? b.kind : 'persona' })]),
        el('div', { cls: 'facts', text: facts(state.kind, b) }),
        el('p', { cls: 'words' }, [words(b.words)]),
        el('button', { type: 'button', cls: 'add small', text: 'Add to the role', onclick: function () { add(state.kind, b.name); } })
      ]);
      ul.appendChild(li);
    });
  }

  function add(kind, name) {
    NB.addBlock(blocks, state.role, kind, name);
    drawCard();
    update();
    showOnPhone('card');
  }

  // ------------------------------------------------------------ the controls

  var unset = '(default)';

  /** An input for a value the control desc describes; onChange(value),
   * undefined when cleared. */
  function control(desc, value, onChange) {
    switch (desc.type) {
      case 'bool': {
        var s = el('select', {}, [unset, 'true', 'false'].concat(desc.nullable ? ['null'] : []).map(function (o) { return el('option', { value: o, text: o }); }));
        s.value = value === undefined ? unset : String(value);
        s.addEventListener('change', function () {
          onChange(s.value === unset ? undefined : s.value === 'null' ? null : s.value === 'true');
        });
        return s;
      }
      case 'int': {
        var i = el('input', { type: 'number', step: '1', min: desc.min, max: desc.max, placeholder: desc.nullable ? 'none' : '' });
        i.value = value === undefined || value === null ? '' : String(value);
        i.addEventListener('input', function () {
          onChange(i.value === '' ? (desc.nullable && value === null ? null : undefined) : Number(i.value));
        });
        return i;
      }
      case 'enum': {
        var e = el('select', {}, [unset].concat(desc.values.map(String)).map(function (o) { return el('option', { value: o, text: o }); }));
        e.value = value === undefined ? unset : String(value);
        e.addEventListener('change', function () {
          if (e.value === unset) return onChange(undefined);
          var hit = desc.values.filter(function (v) { return String(v) === e.value; })[0];
          onChange(hit);
        });
        return e;
      }
      case 'text': {
        var t = el('input', { type: 'text', spellcheck: 'false', autocomplete: 'off' });
        t.value = value === undefined ? '' : String(value);
        t.addEventListener('input', function () { onChange(t.value === '' ? undefined : t.value); });
        return t;
      }
      case 'sizeMap': return sizeMap(desc, value, onChange);
      case 'either': {
        var box = el('div', { cls: 'either' });
        var isMap = value !== undefined && value !== null && typeof value === 'object';
        var pick = el('select', {}, [el('option', { value: 'one', text: 'one value' }), el('option', { value: 'map', text: 'by table size' })]);
        pick.value = isMap ? 'map' : 'one';
        var slot = el('span');
        function fill() {
          slot.textContent = '';
          slot.appendChild(pick.value === 'map'
            ? sizeMap(desc.map, isMap ? value : undefined, function (v) { value = v; onChange(v); })
            : control(desc.one, isMap ? undefined : value, function (v) { value = v; onChange(v); }));
        }
        pick.addEventListener('change', function () { value = undefined; isMap = pick.value === 'map'; onChange(undefined); fill(); });
        fill();
        box.appendChild(pick);
        box.appendChild(slot);
        return box;
      }
      case 'object': {
        var obj = el('div', { cls: 'obj' });
        var v = value && typeof value === 'object' ? Object.assign({}, value) : {};
        Object.keys(desc.fields).forEach(function (k) {
          obj.appendChild(field(k, desc.fields[k], v[k], function (x) {
            if (x === undefined) delete v[k]; else v[k] = x;
            onChange(Object.keys(v).length ? Object.assign({}, v) : undefined);
          }));
        });
        return obj;
      }
      default: {
        var y = el('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', placeholder: 'YAML', cls: 'mono' });
        y.value = value === undefined ? '' : (window.jsyaml ? window.jsyaml.dump(value, { flowLevel: 0 }).trim() : JSON.stringify(value));
        y.addEventListener('input', function () {
          if (y.value.trim() === '') return onChange(undefined);
          try {
            onChange(window.jsyaml ? window.jsyaml.load(y.value) : JSON.parse(y.value));
            y.setCustomValidity('');
          } catch (err) {
            y.setCustomValidity('not YAML');
          }
        });
        return y;
      }
    }
  }

  function sizeMap(desc, value, onChange) {
    var box = el('div', { cls: 'sizemap' });
    var rows = Object.keys(value && typeof value === 'object' ? value : {}).map(function (k) { return [k, value[k]]; });
    function emit() {
      var out = {};
      rows.forEach(function (r) { if (r[0] !== '') out[r[0]] = r[1]; });
      onChange(Object.keys(out).length ? out : undefined);
    }
    function draw() {
      box.textContent = '';
      rows.forEach(function (r, i) {
        var size = el('input', { type: 'number', min: '1', step: '1', 'aria-label': 'players or fewer' });
        size.value = r[0];
        size.addEventListener('input', function () { r[0] = size.value; emit(); });
        var of = Object.assign({}, desc.of, { nullable: desc.nullable });
        box.appendChild(el('div', { cls: 'entry' }, [
          el('span', { cls: 'muted', text: 'up to' }), size, el('span', { cls: 'muted', text: 'players:' }),
          control(of, r[1], function (v) { r[1] = v; emit(); }),
          el('button', { type: 'button', cls: 'small', text: '×', 'aria-label': 'remove', onclick: function () { rows.splice(i, 1); emit(); draw(); } })
        ]));
      });
      box.appendChild(el('button', {
        type: 'button', cls: 'small', text: '+ size',
        onclick: function () {
          var last = rows.length ? Number(rows[rows.length - 1][0]) || 0 : 0;
          rows.push([String(last + 1), desc.of.type === 'bool' ? true : desc.of.type === 'int' ? (desc.of.min || 0) : undefined]);
          emit(); draw();
        }
      }));
    }
    draw();
    return box;
  }

  function field(name, desc, value, onChange, note) {
    return el('div', { cls: 'field' }, [
      el('span', { cls: 'k', text: name }),
      control(desc, value, function (v) { onChange(v); }),
      note ? el('span', { cls: 't' }, [words(note)]) : null
    ]);
  }

  // ------------------------------------------------------------- the card

  function drawStart() {
    var s = $('start');
    s.textContent = '';
    s.appendChild(el('option', { value: '', text: 'An empty role' }));
    (blocks.examples || []).forEach(function (m) {
      var g = el('optgroup', { label: m.mode });
      (m.roles || []).forEach(function (r) { g.appendChild(el('option', { value: m.mode + ':' + r.id, text: r.id })); });
      s.appendChild(g);
    });
  }

  function drawTeams() {
    var s = $('role-team');
    s.textContent = '';
    s.appendChild(el('option', { value: '', text: '(pick a team)' }));
    NB.teams(blocks).forEach(function (t) {
      s.appendChild(el('option', { value: t.id, text: t.id + ' (' + t.alignment + ', ' + t.mode + ')' }));
    });
    s.appendChild(el('option', { value: '*', text: 'another team…' }));
  }

  function start(value) {
    if (!value) {
      state.role = NB.newRole();
    } else {
      var i = value.indexOf(':');
      state.role = NB.exampleRole(blocks, value.slice(0, i), value.slice(i + 1)) || NB.newRole();
    }
    $('start').value = value;
    drawCard();
    update();
  }

  function drawCard() {
    var r = state.role;
    $('role-id').value = r.id;
    var known = NB.teams(blocks).some(function (t) { return t.id === r.team; });
    $('role-team').value = !r.team ? '' : known ? r.team : '*';
    $('role-team-other').hidden = !(r.team && !known) && $('role-team').value !== '*';
    $('role-team-other').value = known ? '' : r.team;
    var p = $('persona');
    p.textContent = '';
    if (r.persona) {
      p.appendChild(el('strong', { text: r.persona }));
      p.appendChild(document.createTextNode(' '));
      p.appendChild(el('button', { type: 'button', cls: 'small', text: '×', 'aria-label': 'remove the persona', onclick: function () { r.persona = null; NB.pruneParams(blocks, schema, r); drawCard(); update(); } }));
    } else {
      p.textContent = 'none: drop a persona here';
    }
    var ul = $('uses');
    ul.textContent = '';
    r.verbs.forEach(function (u, i) { ul.appendChild(useCard(u, i)); });
    $('uses-empty').hidden = r.verbs.length > 0;
    drawParams();
  }

  function useCard(u, i) {
    var r = state.role;
    var b = NB.block(blocks, 'verbs', u.verb);
    var def = NB.verbDef(schema, u.verb) || { properties: {} };
    var li = el('li', { cls: 'use', 'data-verb': u.verb }, [
      el('header', {}, [
        el('span', { cls: 'name', text: u.verb }),
        el('span', { cls: 'chip', text: b ? b.kind : '?' }),
        el('button', { type: 'button', cls: 'small', text: '↑', 'aria-label': 'move up', onclick: function () { NB.moveUse(r, i, -1); drawCard(); update(); } }),
        el('button', { type: 'button', cls: 'small', text: '↓', 'aria-label': 'move down', onclick: function () { NB.moveUse(r, i, 1); drawCard(); update(); } }),
        el('button', { type: 'button', cls: 'small', text: '×', 'aria-label': 'remove', onclick: function () { NB.removeUse(r, i); NB.pruneParams(blocks, schema, r); drawCard(); update(); } })
      ]),
      b ? el('p', { cls: 'words' }, [words(b.words)]) : el('p', { cls: 'words', text: 'Not in the block list.' })
    ]);
    // The keys most roles leave alone fold away until one is set.
    var rare = ['id', 'when', 'step', 'targets'];
    var more = el('details', { cls: 'more' });
    var moreKeys = [];
    NB.useFields(blocks, schema, u.verb).forEach(function (k) {
      var keyInfo = blocks.keys && blocks.keys['use.' + k];
      var argInfo = b && b.args && b.args[k];
      var note = keyInfo ? keyInfo.words : argInfo ? 'An argument: ' + argInfo.type + '.' : '';
      var f = field(k, NB.controlFor(schema, def.properties[k]), u[k], function (v) {
        NB.setUseKey(r, i, k, v);
        update();
      }, note);
      if (rare.indexOf(k) >= 0) {
        moreKeys.push(k);
        if (u[k] !== undefined) more.open = true;
        more.appendChild(f);
      } else {
        li.appendChild(f);
      }
    });
    if (moreKeys.length) {
      more.insertBefore(el('summary', { text: 'More keys: ' + moreKeys.join(', ') }), more.firstChild);
      li.appendChild(more);
    }
    return li;
  }

  function drawParams() {
    var r = state.role;
    $('params-id').textContent = r.id || 'id';
    var box = $('params');
    box.textContent = '';
    NB.roleParams(blocks, schema, r).forEach(function (p) {
      var types = [];
      p.from.forEach(function (f) {
        var b = NB.block(blocks, 'verbs', f) || NB.block(blocks, 'personas', f);
        if (b && b.params && b.params[p.name]) types.push(b.params[p.name].type);
      });
      var note = 'Read by ' + p.from.join(', ') + (types.length ? ': ' + types[0] + '.' : '.');
      if (p.name === 'unique') note = 'Every role: whether a deal may hold it once at most.';
      box.appendChild(field(p.name, NB.controlFor(schema, NB.paramDef(schema, p.name)), r.params[p.name], function (v) {
        NB.setParam(r, p.name, v);
        update();
      }, note));
    });
  }

  // -------------------------------------------------------------- the YAML

  function update() {
    var r = state.role;
    $('params-id').textContent = r.id || 'id';
    state.yaml = NB.toYaml(NB.fragment(r));
    var bad = {};
    var status = $('built-status');
    status.textContent = '';
    if (state.checker && window.jsyaml) {
      state.result = NB.checkText(state.yaml, window.jsyaml, state.checker);
      if (state.result.ok) {
        status.appendChild(el('span', { cls: 'ok', text: '✓ The schema takes it.' }));
      } else {
        var ul = el('ul');
        state.result.errors.forEach(function (e) {
          bad[e.line] = true;
          ul.appendChild(el('li', { text: 'line ' + e.line + ': ' + NB.pathText(e.path) + ' ' + e.message }));
        });
        status.appendChild(ul);
      }
    }
    var pre = $('yaml');
    pre.textContent = '';
    state.yaml.replace(/\n$/, '').split('\n').forEach(function (line, i) {
      pre.appendChild(el('span', { cls: 'ln' + (bad[i + 1] ? ' err' : '') }, [line + '\n']));
    });
  }

  function checkPasted() {
    var status = $('paste-status');
    status.textContent = '';
    if (!state.checker || !window.jsyaml) {
      status.textContent = 'The checker isn\'t loaded.';
      return;
    }
    var res = NB.checkText($('paste').value, window.jsyaml, state.checker);
    state.pasted = res;
    if (res.ok) {
      status.appendChild(el('span', { cls: 'ok', text: '✓ The schema takes it (' + (res.whole ? 'a whole mode file' : 'a part of a mode file') + ').' }));
      return;
    }
    var ul = el('ul');
    res.errors.forEach(function (e) {
      ul.appendChild(el('li', { 'data-line': String(e.line), text: 'line ' + e.line + ', column ' + e.column + ': ' + NB.pathText(e.path) + ' ' + e.message }));
    });
    status.appendChild(ul);
  }

  function copy() {
    var done = function (ok) { $('copied').textContent = ok ? 'Copied.' : 'Select the YAML and copy it.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.yaml).then(function () { done(true); }, function () { done(fallbackCopy()); });
    } else {
      done(fallbackCopy());
    }
  }

  function fallbackCopy() {
    var t = el('textarea', { readonly: true, 'aria-hidden': 'true' });
    t.value = state.yaml;
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(t);
    return ok;
  }

  // ------------------------------------------------------------ dragging

  function accepts(zone, data) {
    var kind = String(data || '').split(':')[0];
    var want = zone.getAttribute('data-drop');
    return !want || want === kind;
  }

  function zoneOf(target) {
    var z = target.closest && target.closest('[data-drop]');
    return z || (target.closest && target.closest('#card'));
  }

  document.addEventListener('dragover', function (ev) {
    var z = zoneOf(ev.target);
    if (!z) return;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
    if (z.classList.contains('drop')) z.classList.add('over');
  });
  document.addEventListener('dragleave', function (ev) {
    var z = zoneOf(ev.target);
    if (z) z.classList.remove('over');
  });
  document.addEventListener('drop', function (ev) {
    var z = zoneOf(ev.target);
    if (!z) return;
    ev.preventDefault();
    z.classList.remove('over');
    var data = ev.dataTransfer.getData('text/plain');
    var i = data.indexOf(':');
    if (i < 0) return;
    var kind = data.slice(0, i);
    if (z.getAttribute('data-drop') && !accepts(z, data)) return;
    if (kind !== 'verbs' && kind !== 'personas') return;
    add(kind, data.slice(i + 1));
  });

  // ---------------------------------------------------------- the phone

  function showOnPhone(which) {
    document.querySelector('main.layout').setAttribute('data-show', which);
    Array.prototype.forEach.call(document.querySelectorAll('.tabs button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-show') === which));
    });
  }

  // ----------------------------------------------------------------- wiring

  $('rules-version').textContent = 'Rules ' + blocks.version + ': ' + blocks.modes.join(' and ') + '.';
  $('search').addEventListener('input', drawPalette);
  $('start').addEventListener('change', function () { start($('start').value); });
  $('role-id').addEventListener('input', function () {
    var old = state.role.id;
    state.role.id = $('role-id').value.trim();
    if (old !== state.role.id) update();
  });
  $('role-team').addEventListener('change', function () {
    var v = $('role-team').value;
    $('role-team-other').hidden = v !== '*';
    state.role.team = v === '*' ? $('role-team-other').value.trim() : v;
    update();
  });
  $('role-team-other').addEventListener('input', function () {
    state.role.team = $('role-team-other').value.trim();
    update();
  });
  $('copy').addEventListener('click', copy);
  $('check').addEventListener('click', checkPasted);
  function outTab(paste) {
    $('tab-built').setAttribute('aria-selected', String(!paste));
    $('tab-paste').setAttribute('aria-selected', String(paste));
    $('built').hidden = paste;
    $('pasted').hidden = !paste;
  }
  $('tab-built').addEventListener('click', function () { outTab(false); });
  $('tab-paste').addEventListener('click', function () { outTab(true); });
  Array.prototype.forEach.call(document.querySelectorAll('.tabs button'), function (b) {
    b.addEventListener('click', function () { showOnPhone(b.getAttribute('data-show')); });
  });

  drawKinds();
  drawPalette();
  drawStart();
  drawTeams();
  var first = (blocks.examples || [])[0];
  var example = first && (first.roles || []).filter(function (r) { return r.id === 'exorcist'; })[0];
  start(example ? first.mode + ':exorcist' : first && first.roles && first.roles[0] ? first.mode + ':' + first.roles[0].id : '');

  window.NoxtellPage = { state: state, start: start, add: add, checkPasted: checkPasted };
})();
