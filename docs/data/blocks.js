window.NOXTELL_BLOCKS = {
 "format": 1,
 "version": "0.0.13",
 "modes": [
  "possession",
  "wolf",
  "demon",
  "brood",
  "zombie"
 ],
 "verbKinds": {
  "infoNow": "answered on the holder's own turn, from the snapshot taken at the start of the night",
  "effect": "resolves at its dawn step",
  "dawnInfo": "resolves at its dawn step and tells its holder at the dawn role call",
  "team": "one pick for the whole team; the team's leader breaks a tie",
  "pooled": "its pick joins a pool, which resolves every pick together",
  "passive": "asks nothing: the engine applies it by itself",
  "trigger": "fires on a death or a change of card",
  "day": "used by day"
 },
 "results": {
  "one": "its private result names one player",
  "several": "its private result names more than one player (its use needs `d248`)"
 },
 "kinds": [
  {
   "key": "verbs",
   "title": "Verbs",
   "where": "a role's `verbs:`, or a team's `actions:` or `choice:`"
  },
  {
   "key": "personas",
   "title": "Personas",
   "where": "a role's `persona:`"
  },
  {
   "key": "teamModules",
   "title": "Team modules",
   "where": "a team's `module:`"
  },
  {
   "key": "pools",
   "title": "Pools",
   "where": "a verb use's `pool:`"
  },
  {
   "key": "recipes",
   "title": "Deal recipes",
   "where": "`deal: {recipe: ...}`"
  },
  {
   "key": "predicates",
   "title": "Conditions",
   "where": "a verb use's `when:`"
  },
  {
   "key": "wins",
   "title": "Win conditions",
   "where": "a team's `wins:`"
  },
  {
   "key": "statuses",
   "title": "Statuses",
   "where": "the mode's `statuses:`"
  }
 ],
 "keys": {
  "mode.id": {
   "type": "an id (lower case, digits and _); required",
   "words": "The mode's id: lower case letters, digits and `_`. Never renamed: saves and records name it.",
   "required": true
  },
  "mode.version": {
   "type": "a version (0.0.10); required",
   "words": "The version it belongs to; it must match the file's name and folder.",
   "required": true
  },
  "mode.schema": {
   "type": "4; required",
   "words": "The file format's number.",
   "required": true
  },
  "mode.status": {
   "type": "one of playable, planned, hidden; required",
   "words": "`playable` (offered and played), `planned` (shown as coming soon and never played, so it may leave out every key a built mode needs) or `hidden` (built, offered nowhere yet).",
   "required": true
  },
  "mode.players": {
   "type": "an object {min, max}; required in a playable mode",
   "words": "The table sizes it plays."
  },
  "mode.players.min": {
   "type": "an integer, at least 1; required",
   "words": "The smallest table.",
   "required": true
  },
  "mode.players.max": {
   "type": "an integer, at least 1; required",
   "words": "The largest table.",
   "required": true
  },
  "mode.styles": {
   "type": "a list, not empty, each one of seatOrder, roleCall; required in a playable mode",
   "words": "The night styles it offers: `seatOrder` (the iPad passed from seat to seat) and `roleCall` (eyes closed, the roles called in turn). Possession offers `seatOrder` only."
  },
  "mode.defaultStyle": {
   "type": "one of seatOrder, roleCall, or an object; required in a playable mode",
   "words": "How a new setup picks the night style: one style, or `{seatOrderUpTo: N}` (seat order up to N players, role call above)."
  },
  "mode.nights": {
   "type": "a size table ({upTo} or {from}); required in a playable mode",
   "words": "Nights before the final vote, by table size: `{upTo: {...}}` (that many players or fewer) or `{from: [[players, nights], ...]}`."
  },
  "mode.nights.upTo": {
   "type": "a size map (\"players or fewer\": value)",
   "words": "\"players or fewer\": value."
  },
  "mode.nights.from": {
   "type": "a list, each [players, value]",
   "words": "Steps: [[from players, value], ...]."
  },
  "mode.kills": {
   "type": "an object; required in a playable mode",
   "words": "When the night kills start."
  },
  "mode.kills.nightOneFrom": {
   "type": "an integer, at least 1, or null; required",
   "words": "The table size from which the first night has a kill; below it the first kill night is night 2; `null`: never on night 1. The `killNight` condition and Possession's spirit read it.",
   "required": true
  },
  "mode.kills.twoPerNightFrom": {
   "type": "an integer, at least 1, or null",
   "words": "`null` or left out: a second kill a night isn't built."
  },
  "mode.codes": {
   "type": "a codes object; required",
   "words": "Pinned forever, and never another mode's: the screen-code letter of each night style, its rulebook tab and the simulator's seed index.",
   "required": true
  },
  "mode.codes.seatOrder": {
   "type": "one capital letter or digit",
   "words": "The screen-code letter of its seat-order nights."
  },
  "mode.codes.roleCall": {
   "type": "one capital letter or digit",
   "words": "The screen-code letter of its role-call nights."
  },
  "mode.codes.tab": {
   "type": "an integer from 1 to 31",
   "words": "Its tab in the rulebook."
  },
  "mode.codes.sim": {
   "type": "an integer, at least 0",
   "words": "The simulator's seed index."
  },
  "mode.tone": {
   "type": "one of the pinned tones",
   "words": "Its colours by name, one of the pinned tones (Possession: `cult`); a mode may give `colours` instead."
  },
  "mode.colours": {
   "type": "an object {fg, bg}",
   "words": "Its own colours, instead of a tone."
  },
  "mode.colours.fg": {
   "type": "a colour #rrggbb; required",
   "words": "The foreground colour, #rrggbb.",
   "required": true
  },
  "mode.colours.bg": {
   "type": "a colour #rrggbb; required",
   "words": "The background colour, #rrggbb.",
   "required": true
  },
  "mode.options": {
   "type": "an options overlay",
   "words": "Its overlay on the version's options: what this mode changes, key by key. Recorded in every game's header."
  },
  "mode.options.dawn": {
   "type": "a list, not empty, each an id (lower case, digits and _)",
   "words": "The dawn step order, replacing the version's. Possession's is `[possession]`: one pooled dawn."
  },
  "mode.options.ghostPoll": {
   "type": "an object",
   "words": "The ghost poll: each night every dead player may name one living player, and dawn names the most named in public."
  },
  "mode.options.ghostPoll.minVotes": {
   "type": "an integer, at least 0; required",
   "words": "The fewest ghost votes the most-named player needs to be named at dawn (a tie names nobody); `0` turns the poll off, as Possession does.",
   "required": true
  },
  "mode.options.ghostVotes": {
   "type": "an integer, at least 0",
   "words": "How many votes each dead player has for the whole game, at most one a ballot; unset is 1, and `0` means the dead never vote."
  },
  "mode.options.execution": {
   "type": "an execution rule",
   "words": "Who a day vote executes. Unset: the most votes, if at least half the living, with a tie executing nobody."
  },
  "mode.options.execution.need": {
   "type": "one of atLeastHalf, overHalf, mostVotes",
   "words": "The bar: `atLeastHalf` (at least half the living), `overHalf` (more than half) or `mostVotes` (the most votes, whatever the count)."
  },
  "mode.options.execution.ties": {
   "type": "one of none, revote",
   "words": "A tie for the most votes: `none` (nobody is executed) or `revote` (one more ballot, between the tied nominees only)."
  },
  "mode.options.finalVote": {
   "type": "a final vote rule",
   "words": "The final vote, after the last night."
  },
  "mode.options.finalVote.revotes": {
   "type": "an integer from 0 to 3",
   "words": "How many times a tied final vote is held again between the tied (0 to 3) before nobody is executed. Unset: once."
  },
  "mode.options.roles": {
   "type": "an object",
   "words": "Role id to its parameters, layered over the version's parameter by parameter. Each must be one the role reads: see each library entry, and Possession's settings."
  },
  "mode.options.factions": {
   "type": "an object",
   "words": "Team id to its parameters, layered over the version's the same way."
  },
  "mode.teams": {
   "type": "a list, each an object with \"module\"; required in a playable mode",
   "words": "Its teams, in the order their wins are checked. Each is an object with `module` (a team module from the library), these keys and the module's own arguments."
  },
  "mode.teams[].module": {
   "type": "a name from the library",
   "words": "The team module, from the library.",
   "required": true
  },
  "mode.teams[].id": {
   "type": "an id (lower case, digits and _); required",
   "words": "The team's id: roles' `team`, options.factions and the records name it.",
   "required": true
  },
  "mode.teams[].alignment": {
   "type": "one of good, evil; required",
   "words": "Good or evil.",
   "required": true
  },
  "mode.teams[].leader": {
   "type": "an id (lower case, digits and _)",
   "words": "The role that leads it (Possession's cult: `summoner`)."
  },
  "mode.teams[].actions": {
   "type": "a list, each a verb name or an object with \"verb\"",
   "words": "Verb uses the team holds, asked of its members: each a verb use."
  },
  "mode.teams[].choice": {
   "type": "a verb name or an object with \"verb\"",
   "words": "A team choice: one verb use the team decides."
  },
  "mode.teams[].wake": {
   "type": "one of everyNight, window",
   "words": "When the team wakes on role-call nights: `everyNight`, or `window` (its role-call window, the default)."
  },
  "mode.teams[].sidesWith": {
   "type": "a list, each an id (lower case, digits and _)",
   "words": "Teams it sides with at parity and in the win."
  },
  "mode.teams[].wins": {
   "type": "a list, each a win condition name or an object with \"win\"",
   "words": "Win conditions it adds to its module's own."
  },
  "mode.teams[].wins[].win": {
   "type": "a name from the library",
   "words": "A win condition, from the library.",
   "required": true
  },
  "mode.teams[].tone": {
   "type": "one of the pinned tones",
   "words": "Its colours by name, as the mode's `tone`."
  },
  "mode.roles": {
   "type": "a list, each a role; required in a playable mode",
   "words": "Its roles, in the order the rulebook lists them."
  },
  "mode.roles[].id": {
   "type": "an id (lower case, digits and _); required",
   "words": "The role's id: the words, options.roles, the deal and the records name it.",
   "required": true
  },
  "mode.roles[].team": {
   "type": "an id (lower case, digits and _); required",
   "words": "The team it starts on.",
   "required": true
  },
  "mode.roles[].codeBit": {
   "type": "an integer, at least 0",
   "words": "Its bit in a screen code's picked list."
  },
  "mode.roles[].pickable": {
   "type": "true or false",
   "words": "Whether a picked list may hold it (default: whether it has a `codeBit`)."
  },
  "mode.roles[].persona": {
   "type": "a persona name",
   "words": "A persona from the library: what its card shows its holder instead of the truth."
  },
  "mode.roles[].tags": {
   "type": "a list, each a tag",
   "words": "Names the library's entries look roles up by: `leader` (the evil leader: the village wins once none lives or the final vote executes it, and a successor takes over its card), `<team>.leader` (a third team's leader: that team wins only while it lives)."
  },
  "mode.roles[].verbs": {
   "type": "a list, each a verb name or an object with \"verb\"",
   "words": "Its powers: each a verb use."
  },
  "mode.statuses": {
   "type": "a list, each a status name or an object with \"status\"",
   "words": "The statuses from the library the mode brings in: each a name, or an object with `status` and its arguments."
  },
  "mode.statuses[].status": {
   "type": "a name from the library",
   "words": "A status, from the library.",
   "required": true
  },
  "mode.deal": {
   "type": "an object with \"recipe\"; required in a playable mode",
   "words": "The deal: `recipe` (a deal recipe from the library) and that recipe's arguments."
  },
  "mode.deal.recipe": {
   "type": "a name from the library",
   "words": "The deal recipe, from the library.",
   "required": true
  },
  "mode.night": {
   "type": "a night object; required in a playable mode",
   "words": "The night: role-call windows, the dawn call and the mode's own timings. The dawn's step order is the options' `dawn`."
  },
  "mode.night.talk": {
   "type": "a size table ({upTo} or {from})",
   "words": "The day's talk time in seconds, by table size (written like `nights:`). Unset: 5 minutes."
  },
  "mode.night.talk.upTo": {
   "type": "a size map (\"players or fewer\": value)",
   "words": "\"players or fewer\": value."
  },
  "mode.night.talk.from": {
   "type": "a list, each [players, value]",
   "words": "Steps: [[from players, value], ...]."
  },
  "mode.night.finalTalk": {
   "type": "a size table ({upTo} or {from})",
   "words": "The final day's talk time in seconds, by table size. Unset: the same as `talk`."
  },
  "mode.night.finalTalk.upTo": {
   "type": "a size map (\"players or fewer\": value)",
   "words": "\"players or fewer\": value."
  },
  "mode.night.finalTalk.from": {
   "type": "a list, each [players, value]",
   "words": "Steps: [[from players, value], ...]."
  },
  "mode.night.roleCall": {
   "type": "a list, each a window ({team, roles} or {role})",
   "words": "Role-call windows in night order, on role-call nights: `{team, roles}` or `{role}`."
  },
  "mode.night.roleCall[].team": {
   "type": "an id (lower case, digits and _)",
   "words": "A team's window: the team, its roles called in turn."
  },
  "mode.night.roleCall[].roles": {
   "type": "a list, not empty, each an id (lower case, digits and _)",
   "words": "With team: the team's roles in this window, in turn."
  },
  "mode.night.roleCall[].role": {
   "type": "an id (lower case, digits and _)",
   "words": "One role's window."
  },
  "mode.night.dawnCall": {
   "type": "a list, each an id (lower case, digits and _)",
   "words": "The dawn role call's candidates, in order: each is called at dawn, eyes closed, to read its own news."
  },
  "mode.night.timing": {
   "type": "an object",
   "words": "The mode's own step timings over the version's night data, in seconds `[min, max]`: `min` is the fixed wait, `max` when the step stops waiting."
  },
  "mode.night.timing.seat": {
   "type": "[min, max] seconds",
   "words": "A seat-order turn: `min` is the turn's floor, the same for every seat so the time says nothing; `max` is when its choice times out."
  },
  "mode.night.timing.team": {
   "type": "[min, max] seconds",
   "words": "A team's role-call window."
  },
  "mode.night.timing.dawnCallOpen": {
   "type": "[min, max] seconds",
   "words": "The wait before the first dawn call."
  },
  "mode.night.timing.dawnCallName": {
   "type": "[min, max] seconds",
   "words": "How long each dawn call shows only the role's name, inside the call's own time."
  },
  "mode.levers": {
   "type": "a list, each a lever",
   "words": "Optional rules the host may turn on at setup. Each is a switch: on, its `options` layer over the game's options; off, it records nothing."
  },
  "version.id": {
   "type": "a version (0.0.10); required",
   "words": "The version, such as `0.0.12`; it must match the file's name and folder.",
   "required": true
  },
  "version.schema": {
   "type": "4; required",
   "words": "The file format's number.",
   "required": true
  },
  "version.modes": {
   "type": "a list, not empty, each an id (lower case, digits and _); required",
   "words": "The version's modes, by id.",
   "required": true
  },
  "version.options": {
   "type": "an options object; required",
   "words": "The engine options every mode starts from; a mode's `options` and its levers layer over them.",
   "required": true
  },
  "version.options.dawn": {
   "type": "a list, not empty, each an id (lower case, digits and _); required; mode and lever",
   "words": "The dawn step order: the steps the night's effects resolve at, in order.",
   "required": true
  },
  "version.options.misinformation": {
   "type": "one of plausible, coinFlip, invert; required",
   "words": "How an impaired player's information is made up: `plausible`, `coinFlip` or `invert`.",
   "required": true
  },
  "version.options.roleChanged": {
   "type": "true or false; required",
   "words": "Whether a player whose role changed is told at dusk.",
   "required": true
  },
  "version.options.ghostPoll": {
   "type": "an object, or null; required; mode and lever",
   "words": "The ghost poll, as a mode's `options.ghostPoll`; `null`: none.",
   "required": true
  },
  "version.options.ghostPoll.minVotes": {
   "type": "an integer, at least 0; required",
   "words": "The fewest ghost votes the most-named player needs to be named at dawn; `0`: no ghost poll.",
   "required": true
  },
  "version.options.revealAtEnd": {
   "type": "true or false; required",
   "words": "Whether every role and team is shown at game over.",
   "required": true
  },
  "version.options.noSelfVote": {
   "type": "true or false",
   "words": "Whether a ballot never offers the voter's own seat."
  },
  "version.options.ghostVotes": {
   "type": "an integer, at least 0; mode and lever",
   "words": "How many votes each dead player has for the whole game; unset is 1."
  },
  "version.options.roles": {
   "type": "an object; required; mode and lever",
   "words": "Role id to its parameters, in every mode's games.",
   "required": true
  },
  "version.options.factions": {
   "type": "an object; required; mode and lever",
   "words": "Team id to its parameters, in every mode's games.",
   "required": true
  },
  "use.verb": {
   "type": "a name from the library",
   "words": "The verb's name, from the library.",
   "required": true
  },
  "use.id": {
   "type": "an ability id (owner.name)",
   "words": "The ability id, `owner.name` (default: the holder's id and the verb's ability, such as `exorcist.rite`). The words and the records key on it."
  },
  "use.step": {
   "type": "a step id",
   "words": "The dawn step it resolves at (default: the verb's)."
  },
  "use.when": {
   "type": "a condition",
   "words": "When it is called: a condition (see Conditions). A condition sees only the night, the table size, the mode and the options, never what happened, so which roles are called never depends on the deal."
  },
  "use.targets": {
   "type": "a targets object",
   "words": "Who it may choose, over the verb's default."
  },
  "use.uses": {
   "type": "an integer, at least 1",
   "words": "Uses a game, on a verb that takes it. Refused in Possession, where every role picks every night."
  },
  "use.pool": {
   "type": "a pool name",
   "words": "The pool its pick joins (Possession's: `possession`): the pool resolves every pick in it together, at its step."
  },
  "use.d248": {
   "type": "\"checked (D###)\" or \"owed\"",
   "words": "Required on a verb whose result names more than one player: `owed` until the result has been checked against the rule that a private result names one player at most, then `checked (D<number>)`, naming the maintainers' decision. `owed` keeps a mode from being playable."
  },
  "use.targets.count": {
   "type": "an integer, at least 0",
   "words": "How many distinct seats to choose (0: no choice, just \"go\")."
  },
  "use.targets.self": {
   "type": "true or false",
   "words": "Whether the actor may choose themselves."
  },
  "use.targets.selfOnly": {
   "type": "true or false",
   "words": "The only legal choice is the holder."
  },
  "use.targets.notAlly": {
   "type": "true or false",
   "words": "Not a teammate the actor was told about."
  },
  "use.targets.alliesOnly": {
   "type": "true or false",
   "words": "Only teammates the actor was told about (and the actor, if self)."
  },
  "use.targets.notLastTarget": {
   "type": "true or false",
   "words": "Not a player this card chose the night before."
  },
  "use.targets.optional": {
   "type": "true or false",
   "words": "The actor may pass instead."
  },
  "use.targets.notWith": {
   "type": "an id (lower case, digits and _)",
   "words": "Not a player carrying this status; only for a status the rules make public as it lands."
  },
  "use.targets.upTo": {
   "type": "true or false",
   "words": "`count` is a most: with fewer legal players, choose them all."
  },
  "use.targets.dead": {
   "type": "true or false",
   "words": "Choose among the dead instead of the living."
  },
  "use.targets.minDead": {
   "type": "an integer, at least 0",
   "words": "With `dead`: pass-only until at least this many players have died."
  }
 },
 "library": {
  "verbs": [
   {
    "name": "senseAlignment",
    "kind": "infoNow",
    "ability": "check",
    "result": "one",
    "useKeys": [
     "when",
     "targets",
     "uses"
    ],
    "words": "Good or evil, about one other living player, from the snapshot taken at the start of the night. `fromNight` sets its first night; `checks` limits how many it makes.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "fromNight": {
      "type": "a night, or a size map of nights"
     },
     "checks": {
      "type": "a count, or a size map of counts"
     }
    },
    "usedBy": {
     "wolf": [
      "seer"
     ],
     "demon": [
      "seer"
     ],
     "brood": [
      "seer"
     ]
    }
   },
   {
    "name": "readDead",
    "kind": "infoNow",
    "ability": "read",
    "result": "one",
    "useKeys": [
     "when",
     "targets",
     "uses"
    ],
    "words": "The true role and team of every player who died since the holder's last reading, from night 2. Off when `pick` is on.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "pick": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "medium"
     ],
     "demon": [
      "medium"
     ]
    }
   },
   {
    "name": "readDeadPick",
    "kind": "infoNow",
    "ability": "pick",
    "result": "one",
    "useKeys": [
     "when",
     "targets",
     "uses"
    ],
    "words": "With `pick` on: once a game, after `minDead` deaths, one dead player's true role and team.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "pick": {
      "type": "true or false"
     },
     "minDead": {
      "type": "an integer, at least 1"
     }
    },
    "usedBy": {
     "wolf": [
      "medium"
     ],
     "demon": [
      "medium"
     ]
    }
   },
   {
    "name": "protect",
    "kind": "effect",
    "ability": "protect",
    "step": "protect",
    "result": "none",
    "dawnNews": true,
    "announces": "killStopped",
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses",
     "pool"
    ],
    "statuses": [
     "protected"
    ],
    "words": "Protects one other player from tonight's night kill, not the same player two nights running unless `everyNight` is on; `fromNight` sets its first night. When its use joins a pool, as the Guardian's does in Possession, the target is `guarded` instead: tonight's kill on them fails, and nobody is told.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "fromNight": {
      "type": "a night, or a size map of nights"
     },
     "everyNight": {
      "type": "true or false"
     },
     "feedback": {
      "type": "true or false"
     },
     "stopsShots": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "possession": [
      "guardian"
     ],
     "wolf": [
      "priest"
     ],
     "demon": [
      "priest"
     ],
     "brood": [
      "priest"
     ]
    }
   },
   {
    "name": "swapCards",
    "kind": "effect",
    "ability": "swap",
    "step": "swap",
    "result": "none",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "words": "Two other players' roles trade, if both are good; it resolves last at dawn. `usesPerGame` sets how many times a game.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "usesPerGame": {
      "type": "an integer, at least 0"
     },
     "feedback": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "meddler"
     ],
     "demon": [
      "meddler"
     ]
    }
   },
   {
    "name": "dawnFragments",
    "kind": "passive",
    "ability": "sense",
    "result": "one",
    "dawnNews": true,
    "useKeys": [
     "when"
    ],
    "words": "At each dawn, one true fragment of the night, naming one player. `fragments` chooses which kind of fragment.",
    "params": {
     "fragments": {
      "type": "one of seat, either, pair"
     },
     "fakeRole": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "sleepless_child"
     ],
     "demon": [
      "sleepless_child"
     ]
    }
   },
   {
    "name": "deathShot",
    "kind": "trigger",
    "ability": "shoot",
    "result": "none",
    "announces": "death",
    "useKeys": [
     "targets"
    ],
    "words": "When the holder dies, they shoot one player, in public. Not when they die at the final vote unless `onFinalVote` is on, nor in an outbreak unless `onOutbreak` is on.",
    "params": {
     "onFinalVote": {
      "type": "true or false"
     },
     "onOutbreak": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "hunter"
     ],
     "demon": [
      "hunter"
     ]
    }
   },
   {
    "name": "attackGuard",
    "kind": "passive",
    "ability": "survive",
    "result": "none",
    "useKeys": [
     "uses"
    ],
    "words": "The holder survives the first night kill against them, silently.",
    "usedBy": {
     "wolf": [
      "elder"
     ],
     "demon": [
      "elder"
     ]
    }
   },
   {
    "name": "revealVoteWeight",
    "kind": "day",
    "ability": "reveal",
    "result": "none",
    "announces": "roleRevealed",
    "useKeys": [
     "targets",
     "uses"
    ],
    "statuses": [
     "revealed"
    ],
    "words": "Once a game, by day, the holder reveals their role and the app confirms it in public (the status `revealed`); from then on their vote counts `voteWeight`.",
    "params": {
     "voteWeight": {
      "type": "an integer, at least 1"
     }
    },
    "usedBy": {
     "wolf": [
      "mayor"
     ],
     "demon": [
      "mayor"
     ]
    }
   },
   {
    "name": "kill",
    "kind": "effect",
    "ability": "kill",
    "step": "kill",
    "result": "none",
    "announces": "death",
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "words": "One player dies at the kill step: the holder picks alone, one player each kill night.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     }
    },
    "usedBy": {
     "demon": [
      "fiend"
     ]
    }
   },
   {
    "name": "teamKill",
    "kind": "team",
    "ability": "kill",
    "step": "kill",
    "result": "none",
    "announces": "death",
    "useKeys": [
     "when",
     "step",
     "targets"
    ],
    "words": "Every holder picks; the most-picked player dies, and the team's leader breaks a tie. No kill on night 1 below the mode's `kills.nightOneFrom`.",
    "usedBy": {
     "wolf": [
      "alpha",
      "wolf"
     ]
    }
   },
   {
    "name": "hex",
    "kind": "effect",
    "ability": "hex",
    "step": "hex",
    "result": "none",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "statuses": [
     "hexed"
    ],
    "words": "The target's ability fails (the status `hexed`) until `until`: the next dawn or the next dusk. With `feedback` on, the holder hears at the dawn call whether it landed. With the argument `feverAbility` and the parameter `fever` on, the holder also has a once-a-game fever, a second ability: the hex does nothing on the night it is used.",
    "args": {
     "feverAbility": {
      "type": "true or false"
     }
    },
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "until": {
      "type": "one of nextDawn, nextDusk"
     },
     "feedback": {
      "type": "true or false"
     },
     "fever": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "demon": [
      "hexer"
     ],
     "brood": [
      "hexer"
     ]
    }
   },
   {
    "name": "recruit",
    "kind": "effect",
    "ability": "recruit",
    "step": "recruit",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets"
    ],
    "words": "A good player joins the holder's team. Its arguments set the cap by table size (`cap`), its first night (`from`), whether a blocked recruit is spent, and whether the team dissolves when the holder dies (`onDeath`).",
    "args": {
     "cap": {
      "type": "a count, or steps [[players, count], ...]"
     },
     "from": {
      "type": "an integer, at least 1"
     },
     "blockedSpendsRecruit": {
      "type": "true or false"
     },
     "onDeath": {
      "type": "one of keep, dissolve"
     }
    },
    "usedBy": {
     "wolf": [
      "cult_leader"
     ],
     "demon": [
      "cult_leader"
     ]
    }
   },
   {
    "name": "learnRole",
    "kind": "infoNow",
    "ability": "learn",
    "result": "one",
    "useKeys": [
     "when",
     "targets",
     "uses"
    ],
    "words": "One player's true role and team, from the snapshot taken at the start of the night.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     }
    },
    "usedBy": {
     "demon": [
      "informant"
     ],
     "brood": [
      "informant"
     ]
    }
   },
   {
    "name": "successor",
    "kind": "trigger",
    "ability": "succeed",
    "result": "none",
    "useKeys": [],
    "words": "When the team's leader dies, the holder takes the leader's card if at least `minAlive` players live; never at the final vote.",
    "args": {
     "minAlive": {
      "type": "an integer, at least 0"
     }
    },
    "params": {
     "minAlive": {
      "type": "an integer, at least 0"
     }
    },
    "usedBy": {
     "demon": [
      "understudy"
     ],
     "brood": [
      "understudy"
     ]
    }
   },
   {
    "name": "nameLeader",
    "kind": "team",
    "ability": "name",
    "result": "none",
    "useKeys": [],
    "words": "The team names its leader in play. With `leaderFromNight` set, it names one at that night's dusk; before night `leaderSuccessionBeforeNight`, losing its leader doesn't end the game while a member lives, and the team names another. With `leaderNamedWithNight` on, the first naming is asked with that night's other picks.",
    "params": {
     "leaderFromNight": {
      "type": "a night, or a size map of nights"
     },
     "leaderSuccessionBeforeNight": {
      "type": "a night, or a size map of nights"
     },
     "leaderNamedWithNight": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "pack"
     ]
    }
   },
   {
    "name": "infect",
    "kind": "effect",
    "ability": "implant",
    "step": "implant",
    "result": "none",
    "dawnNews": true,
    "announces": "outbreak",
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "statuses": [
     "infected",
     "sick",
     "fever",
     "turned"
    ],
    "words": "Plants a hidden infection on one other player (the status `infected`): they are announced `sick` `sickAfter` dawns after it, and break out `outbreakAfter` dawns after it, dying and joining the holder's team as `turned`. A protection, a member of the holder's team or an infection already there stops it silently; with `fevers` on, a stopped infection leaves a `fever` instead, and a `sick` player can't be picked. `fromNight` sets its first night; with `feedback` on, the holder hears at the dawn call whether it took.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "sickAfter": {
      "type": "an integer, at least 0"
     },
     "outbreakAfter": {
      "type": "an integer, at least 0"
     },
     "fevers": {
      "type": "true or false"
     },
     "feedback": {
      "type": "true or false"
     },
     "fromNight": {
      "type": "a night, or a size map of nights"
     }
    },
    "usedBy": {
     "brood": [
      "implanter"
     ]
    }
   },
   {
    "name": "cure",
    "kind": "effect",
    "ability": "cure",
    "step": "cure",
    "result": "none",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "words": "Treats one other player: an `infected` player is cured, an old `fever` breaks, and an infection planted that night is stopped (where the infection has `fevers` on; otherwise it removes the infection). With `curesSick` off, a player already `sick` gets no treatment. `timelineOf` names the role holding `infect` whose settings it reads. With `feedback` on, the holder hears at the dawn call that it worked.",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     }
    },
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "curesSick": {
      "type": "true or false"
     },
     "feedback": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "brood": [
      "medic"
     ]
    }
   },
   {
    "name": "diagnose",
    "kind": "dawnInfo",
    "ability": "examine",
    "step": "examine",
    "result": "one",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "uses"
    ],
    "words": "At its dawn call, tells the holder about one other player: a real infection, just a fever, or nothing. `feedback` turns that dawn call on.",
    "params": {
     "uses": {
      "type": "a count, or a size map of counts"
     },
     "feedback": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "brood": [
      "doctor"
     ]
    }
   },
   {
    "name": "villageVote",
    "kind": "pooled",
    "ability": "vote",
    "step": "vote",
    "result": "one",
    "useKeys": [
     "when",
     "step",
     "targets"
    ],
    "words": "Every seat with no night ability names a suspect; the most named alone is checked, and its voters learn at the next dusk whether that player went out that night. `vote` turns it on.",
    "params": {
     "vote": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "brood": [
      "village"
     ]
    }
   },
   {
    "name": "rankedMark",
    "kind": "team",
    "ability": "fever",
    "step": "fever",
    "result": "none",
    "announces": "sick",
    "useKeys": [
     "when",
     "step"
    ],
    "statuses": [
     "fever"
    ],
    "words": "Each living member of the team names `fever` players (a number, or a number by table size); the fevers land on the most named, passing over a player marked tonight, then on random open seats. Each one is announced as `sick`.",
    "params": {
     "fever": {
      "type": "a count, or a size map of counts"
     }
    },
    "usedBy": {
     "brood": [
      "hive"
     ]
    }
   },
   {
    "name": "outbreakKill",
    "kind": "team",
    "ability": "attack",
    "step": "kill",
    "result": "none",
    "announces": "death",
    "useKeys": [
     "when",
     "step",
     "targets"
    ],
    "words": "The team's kill, its dead asked too, from the first night an outbreak can happen. `attack` says when it lands: at a dawn with an outbreak (`perOutbreak`), every night after the first outbreak (`afterFirstOutbreak`) or every kill night (`nightly`); `attackBy` says who picks: the whole team (`team`) or only its `turned` members. `timelineOf` names the role holding `infect` whose settings it reads.",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     }
    },
    "params": {
     "attack": {
      "type": "one of perOutbreak, afterFirstOutbreak, nightly"
     },
     "attackBy": {
      "type": "one of team, turned"
     }
    },
    "usedBy": {
     "brood": [
      "hive"
     ]
    }
   },
   {
    "name": "rite",
    "kind": "pooled",
    "ability": "rite",
    "result": "one",
    "dawnNews": true,
    "announces": "spiritStruck",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "statuses": [
     "possessed",
     "guarded",
     "spared",
     "cast_out",
     "trace"
    ],
    "words": "A strike on the spirit's host. The `strikes`-th strike casts the spirit out (the status `cast_out`); every holder of the Rite counts with the first holder's `strikes`.",
    "params": {
     "strikes": {
      "type": "an integer, at least 1"
     },
     "feedback": {
      "type": "a flag, or a size map of flags"
     }
    },
    "usedBy": {
     "possession": [
      "chaplain",
      "exorcist"
     ]
    }
   },
   {
    "name": "groupSense",
    "kind": "pooled",
    "ability": "sense",
    "result": "several",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "Whether the spirit is within the pick's window: the picked player and `window` players on each side (a number, a number by table size, or `{left, right}`). `reads` chooses where the spirit was (`was`) or is (`now`); with `tells: window` the result names the window's players in seat order, so its use carries `d248`.",
    "params": {
     "feedback": {
      "type": "a flag, or a size map of flags"
     },
     "reads": {
      "type": "one of was, now"
     },
     "window": {
      "type": "a number (that many each side), or a size map of numbers or {left, right}"
     },
     "tells": {
      "type": "one of pick, window"
     }
    },
    "usedBy": {
     "possession": [
      "diviner"
     ]
    }
   },
   {
    "name": "ward",
    "kind": "pooled",
    "ability": "ward",
    "result": "one",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "The spirit can't enter the target tonight; the holder is told if it tried.",
    "params": {
     "feedback": {
      "type": "a flag, or a size map of flags"
     }
    },
    "usedBy": {
     "possession": [
      "warden"
     ]
    }
   },
   {
    "name": "senseCult",
    "kind": "pooled",
    "ability": "sense",
    "result": "one",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "Whether the target is in the cult, as they register tonight (a `shield` or a `frame` changes what they register as).",
    "params": {
     "feedback": {
      "type": "a flag, or a size map of flags"
     }
    },
    "usedBy": {
     "possession": [
      "seeker"
     ]
    }
   },
   {
    "name": "driveOut",
    "kind": "pooled",
    "ability": "drive",
    "result": "one",
    "dawnNews": true,
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "If the target is the spirit's host, the spirit flees (where to: the cult's `fleeTo`).",
    "params": {
     "feedback": {
      "type": "a flag, or a size map of flags"
     }
    },
    "usedBy": {
     "possession": [
      "banisher"
     ]
    }
   },
   {
    "name": "senseSpirit",
    "kind": "pooled",
    "ability": "track",
    "result": "one",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "Whether the spirit was in the target last night, answered on the holder's own turn; `fromNight` sets its first night.",
    "params": {
     "fromNight": {
      "type": "a number, or a size map of numbers"
     }
    },
    "usedBy": {
     "possession": [
      "tracker"
     ]
    }
   },
   {
    "name": "watch",
    "kind": "pooled",
    "ability": "watch",
    "result": "one",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "How many other players picked the target tonight. A team's Watch with `pickers: dead` is asked of the team's dead players, and never counted.",
    "args": {
     "pickers": {
      "type": "one of dead"
     }
    },
    "usedBy": {
     "possession": [
      "coven",
      "village",
      "villager"
     ]
    }
   },
   {
    "name": "swapVerbs",
    "kind": "pooled",
    "ability": "swap",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "Two players' abilities trade for the night (never a cultist's).",
    "usedBy": {
     "possession": [
      "trickster"
     ]
    }
   },
   {
    "name": "steer",
    "kind": "pooled",
    "ability": "steer",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "The spirit moves into the target. When the holder dies, its card passes down the cult's line of succession.",
    "usedBy": {
     "possession": [
      "summoner"
     ]
    }
   },
   {
    "name": "shield",
    "kind": "pooled",
    "ability": "veil",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "The target reads clean tonight.",
    "usedBy": {
     "possession": [
      "veiler"
     ]
    }
   },
   {
    "name": "frame",
    "kind": "pooled",
    "ability": "frame",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "The target reads as the spirit's host and as a cultist tonight.",
    "usedBy": {
     "possession": [
      "framer"
     ]
    }
   },
   {
    "name": "block",
    "kind": "pooled",
    "ability": "bind",
    "result": "none",
    "useKeys": [
     "when",
     "step",
     "targets",
     "pool"
    ],
    "words": "The target's pick does nothing tonight.",
    "usedBy": {
     "possession": [
      "binder"
     ]
    }
   }
  ],
  "personas": [
   {
    "name": "falseCard",
    "fakeRolesNeeded": 1,
    "words": "The holder is shown a good role not in play, all game, and believes it; nothing they do works.",
    "usedBy": {
     "wolf": [
      "drunk"
     ],
     "demon": [
      "drunk"
     ]
    }
   },
   {
    "name": "changingCard",
    "statuses": [
     "mad"
    ],
    "fakeRolesNeeded": 2,
    "words": "The holder is shown a different working role each night, and from night `maddensFrom` makes a living neighbour `mad` each dusk (alternating sides, good players only); with `maddensWhenImpaired` off, not on a night their own ability fails.",
    "params": {
     "maddensFrom": {
      "type": "an integer, at least 1"
     },
     "maddensWhenImpaired": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "mad_hatter"
     ],
     "demon": [
      "mad_hatter"
     ]
    }
   }
  ],
  "teamModules": [
   {
    "name": "village",
    "words": "Good. Wins when the evil team's leader dies, or when the final vote executes them. A team adds more ways to win with `wins:`.",
    "params": {
     "vote": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "possession": [
      "village"
     ],
     "wolf": [
      "village"
     ],
     "demon": [
      "village"
     ],
     "brood": [
      "village"
     ]
    }
   },
   {
    "name": "evilTeam",
    "words": "Evil, led by its leader. Its members meet at the deal, with up to `disguises` good roles not in play to claim; it wins at parity (its members at least the rest) and when the final vote misses its leader.",
    "params": {
     "disguises": {
      "type": "an integer, at least 0"
     }
    },
    "usedBy": {
     "wolf": [
      "pack"
     ],
     "demon": [
      "court"
     ]
    }
   },
   {
    "name": "cult",
    "words": "A third team, siding with the teams in its `sidesWith`. `win` says how it wins: `withAllies` (if the side it is allied with wins and its leader lives, it wins with them), `leaderSurvivesShares` (its leader alive at the end: it wins as well), `leaderSurvivesOverrides` (its leader alive at the end: it wins alone) or `halfOverrides` (its leader alive and the team at least half the living at the end: it wins alone). Under `withAllies` it counts with its allies at parity, unless `parity` is off.",
    "args": {
     "win": {
      "type": "one of halfOverrides, leaderSurvivesOverrides, leaderSurvivesShares, withAllies"
     }
    },
    "params": {
     "win": {
      "type": "one of halfOverrides, leaderSurvivesOverrides, leaderSurvivesShares, withAllies"
     },
     "parity": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "wolf": [
      "cult"
     ]
    }
   },
   {
    "name": "outbreakTeam",
    "words": "Evil, as `evilTeam` is (it meets at the deal, up to `disguises` good roles from `disguisePool` to claim, and wins at parity and when the final vote misses its leader), with outbreaks: an infected player who breaks out joins it as `turned`. `turnedGhostVote` and `turnedGhostVotes` give the turned a ghost vote; `turnedLearnTeam` tells them their new team; with `sickVote` on, the sick keep their vote.",
    "args": {
     "disguisePool": {
      "type": "a list"
     }
    },
    "params": {
     "turnedGhostVote": {
      "type": "true or false"
     },
     "turnedGhostVotes": {
      "type": "an integer, at least 0"
     },
     "turnedLearnTeam": {
      "type": "true or false"
     },
     "sickVote": {
      "type": "true or false"
     },
     "disguises": {
      "type": "an integer, at least 0"
     }
    },
    "usedBy": {
     "brood": [
      "hive"
     ]
    }
   },
   {
    "name": "coven",
    "words": "Possession's cult. Its members meet at the deal, with no disguises; it wins at parity (its members at least the rest) and when the final vote misses its Leader. It hides the spirit, draws the line of succession (`successionBeforeNight`) and tells its members where the spirit is. `fleeTo` says where a driven-out spirit goes (`neighbour` or `anywhere`); `spareCult` turns the spirit's kill on a cultist onto a neighbour; `hostActs` hides the spirit only in a seat asked that night. Built and off unless set: `alsoKills`, `alsoKillsFrom`, `unguardedFrom`, `hosts`, `steerMoves`, `strikesShared`, `quietDaysShorten`.",
    "params": {
     "successionBeforeNight": {
      "type": "a night, or a size map of nights"
     },
     "fleeTo": {
      "type": "one of neighbour, anywhere"
     },
     "spareCult": {
      "type": "true or false"
     },
     "hostActs": {
      "type": "true or false"
     },
     "alsoKills": {
      "type": "one of none, steer, newHostPick"
     },
     "alsoKillsFrom": {
      "type": "last, a night, or a size map of nights"
     },
     "unguardedFrom": {
      "type": "last, a night, or a size map of nights"
     },
     "hosts": {
      "type": "an object"
     },
     "steerMoves": {
      "type": "one of first, last"
     },
     "strikesShared": {
      "type": "true or false"
     },
     "quietDaysShorten": {
      "type": "true or false"
     }
    },
    "usedBy": {
     "possession": [
      "coven"
     ]
    }
   }
  ],
  "pools": [
   {
    "name": "possession",
    "step": "possession",
    "words": "Possession's one dawn: every pick that joins it resolves together, in a fixed order: Block, Swap, Shield and Frame, Protect, the Rite, the kill, Drive out, Ward, the spirit's move, then the checks and the counts.",
    "usedBy": {
     "possession": [
      "banisher",
      "binder",
      "chaplain",
      "coven",
      "diviner",
      "exorcist",
      "framer",
      "guardian",
      "seeker",
      "summoner",
      "tracker",
      "trickster",
      "veiler",
      "village",
      "villager",
      "warden"
     ]
    }
   }
  ],
  "recipes": [
   {
    "name": "classicDeal",
    "words": "The classic deal, exact to the game's seed: the evil team by table size (`evil`), its `helpers` drawn from a pool, a shuffle drawn and set aside first (`burnHelpers`: its length, or a list of roles that long; the draws then match a deal that drew helpers from such a list), a third team from a table size (`thirdParty`), the good roles always dealt, drawn and added (`good`), public lists by table size (`picked`), the evil team's claims (`disguises`) and the roles a false card may show (`fakeRoles`).",
    "args": {
     "evil": {
      "type": "an object"
     },
     "helpers": {
      "type": "an object"
     },
     "burnHelpers": {
      "type": "an integer, at least 1, or a list"
     },
     "thirdParty": {
      "type": "an object"
     },
     "good": {
      "type": "an object"
     },
     "picked": {
      "type": "a size map (\"players or fewer\": value)"
     },
     "disguises": {
      "type": "an object"
     },
     "fakeRoles": {
      "type": "a list"
     }
    },
    "usedBy": {
     "wolf": [
      "the mode's deal"
     ],
     "demon": [
      "the mode's deal"
     ]
    }
   },
   {
    "name": "outbreakDeal",
    "words": "The outbreak deal, from `from` players: the evil team by table size (`evil`) with `helpers`, the good roles (`good`), public lists (`picked`), claims (`disguises`) and the roles a false card may show (`fakeRoles`).",
    "args": {
     "from": {
      "type": "an integer, at least 1"
     },
     "evil": {
      "type": "an object"
     },
     "helpers": {
      "type": "an object"
     },
     "good": {
      "type": "an object"
     },
     "picked": {
      "type": "a size map (\"players or fewer\": value)"
     },
     "disguises": {
      "type": "an object"
     },
     "fakeRoles": {
      "type": "a list"
     }
    },
    "usedBy": {
     "brood": [
      "the mode's deal"
     ]
    }
   },
   {
    "name": "picked",
    "words": "The evil team as `classicDeal` deals it (`evil`, `helpers`), then a public list of good roles by table size (`picked`).",
    "args": {
     "evil": {
      "type": "an object"
     },
     "helpers": {
      "type": "an object"
     },
     "picked": {
      "type": "a size map (\"players or fewer\": value)"
     }
    },
    "usedBy": {}
   },
   {
    "name": "basic",
    "words": "The simplest deal: the evil team by table size (`evil`), everyone else a Villager. For tests.",
    "args": {
     "evil": {
      "type": "an object"
     }
    },
    "usedBy": {}
   },
   {
    "name": "steps",
    "words": "A general deal for new modes: the evil team by table size (`evil`), the good roles always dealt, drawn or added (`good`), a third team (`thirdParty`) and the fewest Villagers (`villagerFloor`). Every draw it makes comes from the game's seed.",
    "args": {
     "evil": {
      "type": "an object"
     },
     "good": {
      "type": "an object"
     },
     "thirdParty": {
      "type": "an object"
     },
     "villagerFloor": {
      "type": "an integer, at least 0, or a list"
     }
    },
    "usedBy": {}
   },
   {
    "name": "possession",
    "words": "Possession's public deal: the Leader (`evil.leader`) and its helpers, drawn from `cultPool` by table size (`evil.from`); the good roles by table size in arrival order (`good`, each `[role, from players]`); Villagers for the rest; and the Trickster from `trickster` players when its lever is on. Then one shuffle.",
    "args": {
     "evil": {
      "type": "an object"
     },
     "cultPool": {
      "type": "a list"
     },
     "good": {
      "type": "a list"
     },
     "trickster": {
      "type": "an integer, at least 1"
     }
    },
    "roleParams": {
     "trickster": {
      "module": {
       "type": "true or false"
      }
     }
    },
    "usedBy": {
     "possession": [
      "the mode's deal"
     ]
    }
   }
  ],
  "predicates": [
   {
    "name": "always",
    "takes": "nothing",
    "words": "Every night.",
    "usedBy": {}
   },
   {
    "name": "all",
    "takes": "conditions",
    "words": "Every part holds: `all: [...]`.",
    "usedBy": {}
   },
   {
    "name": "any",
    "takes": "conditions",
    "words": "Some part holds: `any: [...]`.",
    "usedBy": {}
   },
   {
    "name": "not",
    "takes": "condition",
    "words": "The part doesn't hold: `not: ...`.",
    "usedBy": {}
   },
   {
    "name": "night",
    "takes": "value",
    "arg": {
     "type": "an object"
    },
    "words": "From night N: `night: {from: N}`, or from a parameter, `night: {from: {param: P}}` (a number, or a number by table size).",
    "usedBy": {}
   },
   {
    "name": "size",
    "takes": "value",
    "arg": {
     "type": "an object"
    },
    "words": "At these table sizes: `size: {from: N, to: M}`.",
    "usedBy": {}
   },
   {
    "name": "outbreakPossible",
    "takes": "nothing",
    "words": "The outbreak team's attack nights: from the first night an outbreak can happen (night 1 plus the infection's `outbreakAfter`), or every kill night when `attack` is `nightly`.",
    "usedBy": {}
   },
   {
    "name": "killNight",
    "takes": "nothing",
    "words": "A kill night: night 2 on, and night 1 too from the mode's `kills.nightOneFrom`.",
    "usedBy": {
     "wolf": [
      "alpha",
      "wolf"
     ],
     "demon": [
      "fiend"
     ]
    }
   },
   {
    "name": "param",
    "takes": "value",
    "arg": {
     "type": "a parameter name"
    },
    "words": "When the named parameter is on: `param: P`.",
    "usedBy": {}
   },
   {
    "name": "lastNight",
    "takes": "nothing",
    "words": "The game's last night: the mode's `nights` at this table size, which everyone knows.",
    "usedBy": {}
   }
  ],
  "wins": [
   {
    "name": "statusOnLiving",
    "words": "The team wins once the dawn's deaths are settled while a living player carries `status` (Possession's village: `cast_out`).",
    "args": {
     "status": {
      "type": "an id (lower case, digits and _)"
     }
    },
    "usedBy": {
     "possession": [
      "village"
     ]
    }
   },
   {
    "name": "deathsAtLeast",
    "words": "The team wins once at least `count` players have died (a number, or steps by table size).",
    "args": {
     "count": {
      "type": "a number, or steps [[players, n], ...]"
     }
    },
    "usedBy": {}
   },
   {
    "name": "livingAtMost",
    "words": "The team wins once at most `count` players live (a number, or steps by table size).",
    "args": {
     "count": {
      "type": "a number, or steps [[players, n], ...]"
     }
    },
    "usedBy": {}
   },
   {
    "name": "atLastDawn",
    "words": "The team wins at the last night's dawn if nothing else ended the game: there is no final vote.",
    "usedBy": {}
   }
  ],
  "statuses": [
   {
    "name": "protected",
    "words": "From `protect` outside a pool: lasts to the end of dawn and stops what `stops` lists (by default a night kill, a recruit and a mark).",
    "args": {
     "stops": {
      "type": "a list"
     }
    },
    "usedBy": {
     "wolf": [
      "priest"
     ],
     "demon": [
      "priest"
     ],
     "brood": [
      "priest"
     ]
    }
   },
   {
    "name": "mad",
    "words": "Shown a false good role for a night and the next day, and acting as a `falseCard` does: nothing the player does works.",
    "usedBy": {
     "wolf": [
      "mad_hatter"
     ],
     "demon": [
      "mad_hatter"
     ]
    }
   },
   {
    "name": "revealed",
    "words": "The holder revealed their role by day (`revealVoteWeight`); all game.",
    "usedBy": {
     "wolf": [
      "mayor"
     ],
     "demon": [
      "mayor"
     ]
    }
   },
   {
    "name": "hexed",
    "words": "From `hex`: the holder's ability fails until it ends.",
    "usedBy": {
     "demon": [
      "hexer"
     ],
     "brood": [
      "hexer"
     ]
    }
   },
   {
    "name": "infected",
    "words": "A real infection: `sick` after `sickAfter` dawns, and an outbreak after `outbreakAfter` (the player dies and joins the team, `turned`).",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     },
     "at": {
      "type": "a step id"
     }
    },
    "usedBy": {
     "brood": [
      "implanter"
     ]
    }
   },
   {
    "name": "sick",
    "words": "Public, by name. The sick have no vote unless the team's `sickVote`; with `fevers` on, it ends (cured) once no infection or fever is left.",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     },
     "at": {
      "type": "a step id"
     }
    },
    "usedBy": {
     "brood": [
      "implanter"
     ]
    }
   },
   {
    "name": "fever",
    "words": "Sick, as an infected player is, then it breaks at the dawn an infection would break out.",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     },
     "at": {
      "type": "a step id"
     }
    },
    "usedBy": {
     "brood": [
      "hive",
      "implanter"
     ]
    }
   },
   {
    "name": "turned",
    "words": "A player whose infection broke out: no ghost vote, or the team's `turnedGhostVotes`.",
    "args": {
     "timelineOf": {
      "type": "an id (lower case, digits and _)"
     },
     "at": {
      "type": "a step id"
     }
    },
    "usedBy": {
     "brood": [
      "implanter"
     ]
    }
   },
   {
    "name": "possessed",
    "words": "The spirit's host, hidden from them; shown at game over.",
    "usedBy": {
     "possession": [
      "the mode's statuses"
     ]
    }
   },
   {
    "name": "guarded",
    "words": "A Guardian's protection, to the end of dawn: stops the night kill, and is never announced.",
    "usedBy": {
     "possession": [
      "the mode's statuses"
     ]
    }
   },
   {
    "name": "spared",
    "words": "The cultist the spirit's kill was turned from (the cult's `spareCult`).",
    "usedBy": {
     "possession": [
      "the mode's statuses"
     ]
    }
   },
   {
    "name": "cast_out",
    "words": "The host the last strike cast the spirit out of.",
    "usedBy": {
     "possession": [
      "the mode's statuses"
     ]
    }
   },
   {
    "name": "trace",
    "words": "Where the spirit read as being on a night, for the Tracker's \"last night\".",
    "usedBy": {
     "possession": [
      "the mode's statuses"
     ]
    }
   },
   {
    "name": "full_strength",
    "words": "A mark that the spirit came of age early, for an ending a team wins with `statusOnLiving`. No mode uses it yet.",
    "usedBy": {}
   }
  ]
 },
 "examples": [
  {
   "mode": "possession",
   "teams": [
    {
     "id": "village",
     "alignment": "good",
     "module": "village"
    },
    {
     "id": "coven",
     "alignment": "evil",
     "module": "coven"
    }
   ],
   "roles": [
    {
     "id": "villager",
     "team": "village",
     "verbs": [
      {
       "verb": "watch",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "exorcist",
     "team": "village",
     "verbs": [
      {
       "verb": "rite",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "guardian",
     "team": "village",
     "verbs": [
      {
       "verb": "protect",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "diviner",
     "team": "village",
     "verbs": [
      {
       "verb": "groupSense",
       "pool": "possession",
       "targets": {
        "self": true
       },
       "d248": "checked (D627)"
      }
     ]
    },
    {
     "id": "warden",
     "team": "village",
     "verbs": [
      {
       "verb": "ward",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "seeker",
     "team": "village",
     "verbs": [
      {
       "verb": "senseCult",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "banisher",
     "team": "village",
     "verbs": [
      {
       "verb": "driveOut",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "tracker",
     "team": "village",
     "verbs": [
      {
       "verb": "senseSpirit",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "trickster",
     "team": "village",
     "verbs": [
      {
       "verb": "swapVerbs",
       "pool": "possession",
       "targets": {
        "count": 2
       }
      }
     ]
    },
    {
     "id": "summoner",
     "team": "coven",
     "tags": [
      "leader"
     ],
     "verbs": [
      {
       "verb": "steer",
       "pool": "possession",
       "targets": {
        "notAlly": true
       }
      }
     ]
    },
    {
     "id": "veiler",
     "team": "coven",
     "verbs": [
      {
       "verb": "shield",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "framer",
     "team": "coven",
     "verbs": [
      {
       "verb": "frame",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "binder",
     "team": "coven",
     "verbs": [
      {
       "verb": "block",
       "pool": "possession"
      }
     ]
    },
    {
     "id": "chaplain",
     "team": "village",
     "verbs": [
      {
       "verb": "rite",
       "pool": "possession"
      }
     ]
    }
   ],
   "options": {
    "roles": {
     "exorcist": {
      "strikes": 2,
      "feedback": {
       "6": false,
       "15": true
      },
      "unique": true
     },
     "chaplain": {
      "feedback": true,
      "unique": true
     },
     "diviner": {
      "feedback": true,
      "unique": true,
      "reads": "was",
      "window": {
       "11": 1,
       "15": 2
      },
      "tells": "window"
     },
     "warden": {
      "feedback": true,
      "unique": true
     },
     "seeker": {
      "feedback": true,
      "unique": true
     },
     "banisher": {
      "feedback": true,
      "unique": true
     },
     "tracker": {
      "fromNight": 2
     }
    }
   }
  },
  {
   "mode": "wolf",
   "teams": [
    {
     "id": "village",
     "alignment": "good",
     "module": "village"
    },
    {
     "id": "pack",
     "alignment": "evil",
     "module": "evilTeam"
    },
    {
     "id": "cult",
     "alignment": "evil",
     "module": "cult"
    }
   ],
   "roles": [
    {
     "id": "villager",
     "team": "village"
    },
    {
     "id": "seer",
     "team": "village",
     "codeBit": 0,
     "verbs": [
      "senseAlignment"
     ]
    },
    {
     "id": "priest",
     "team": "village",
     "codeBit": 1,
     "verbs": [
      "protect"
     ]
    },
    {
     "id": "medium",
     "team": "village",
     "codeBit": 2,
     "verbs": [
      "readDead",
      "readDeadPick"
     ]
    },
    {
     "id": "hunter",
     "team": "village",
     "codeBit": 3,
     "verbs": [
      "deathShot"
     ]
    },
    {
     "id": "meddler",
     "team": "village",
     "codeBit": 4,
     "verbs": [
      "swapCards"
     ]
    },
    {
     "id": "elder",
     "team": "village",
     "codeBit": 5,
     "verbs": [
      "attackGuard"
     ]
    },
    {
     "id": "mayor",
     "team": "village",
     "codeBit": 6,
     "verbs": [
      "revealVoteWeight"
     ]
    },
    {
     "id": "drunk",
     "team": "village",
     "codeBit": 7,
     "persona": "falseCard"
    },
    {
     "id": "mad_hatter",
     "team": "village",
     "codeBit": 8,
     "persona": "changingCard"
    },
    {
     "id": "wolf",
     "team": "pack",
     "verbs": [
      {
       "verb": "teamKill",
       "id": "pack.kill",
       "when": "killNight"
      }
     ]
    },
    {
     "id": "alpha",
     "team": "pack",
     "tags": [
      "leader"
     ],
     "verbs": [
      {
       "verb": "teamKill",
       "id": "pack.kill",
       "when": "killNight"
      }
     ]
    },
    {
     "id": "cult_leader",
     "team": "cult",
     "tags": [
      "cult.leader"
     ],
     "verbs": [
      {
       "verb": "recruit",
       "cap": [
        [
         4,
         2
        ],
        [
         15,
         3
        ]
       ],
       "onDeath": "dissolve"
      }
     ]
    },
    {
     "id": "sleepless_child",
     "team": "village",
     "pickable": true,
     "verbs": [
      "dawnFragments"
     ]
    }
   ],
   "options": {
    "roles": {
     "priest": {
      "feedback": false
     }
    }
   }
  },
  {
   "mode": "demon",
   "teams": [
    {
     "id": "village",
     "alignment": "good",
     "module": "village"
    },
    {
     "id": "court",
     "alignment": "evil",
     "module": "evilTeam"
    }
   ],
   "roles": [
    {
     "id": "villager",
     "team": "village"
    },
    {
     "id": "seer",
     "team": "village",
     "codeBit": 0,
     "verbs": [
      "senseAlignment"
     ]
    },
    {
     "id": "priest",
     "team": "village",
     "codeBit": 1,
     "verbs": [
      "protect"
     ]
    },
    {
     "id": "medium",
     "team": "village",
     "codeBit": 2,
     "verbs": [
      "readDead",
      "readDeadPick"
     ]
    },
    {
     "id": "hunter",
     "team": "village",
     "codeBit": 3,
     "verbs": [
      "deathShot"
     ]
    },
    {
     "id": "meddler",
     "team": "village",
     "codeBit": 4,
     "verbs": [
      "swapCards"
     ]
    },
    {
     "id": "elder",
     "team": "village",
     "codeBit": 5,
     "verbs": [
      "attackGuard"
     ]
    },
    {
     "id": "mayor",
     "team": "village",
     "codeBit": 6,
     "verbs": [
      "revealVoteWeight"
     ]
    },
    {
     "id": "drunk",
     "team": "village",
     "codeBit": 7,
     "persona": "falseCard"
    },
    {
     "id": "mad_hatter",
     "team": "village",
     "codeBit": 8,
     "persona": "changingCard"
    },
    {
     "id": "fiend",
     "team": "court",
     "tags": [
      "leader"
     ],
     "verbs": [
      {
       "verb": "kill",
       "when": "killNight"
      }
     ]
    },
    {
     "id": "hexer",
     "team": "court",
     "verbs": [
      "hex"
     ]
    },
    {
     "id": "informant",
     "team": "court",
     "verbs": [
      "learnRole"
     ]
    },
    {
     "id": "understudy",
     "team": "court",
     "verbs": [
      {
       "verb": "successor",
       "minAlive": 7
      }
     ]
    },
    {
     "id": "cult_leader",
     "team": "court",
     "tags": [
      "cult.leader"
     ],
     "verbs": [
      {
       "verb": "recruit",
       "cap": 1,
       "onDeath": "keep"
      }
     ]
    },
    {
     "id": "sleepless_child",
     "team": "village",
     "pickable": true,
     "verbs": [
      "dawnFragments"
     ]
    }
   ],
   "options": {
    "roles": {}
   }
  },
  {
   "mode": "brood",
   "teams": [
    {
     "id": "village",
     "alignment": "good",
     "module": "village"
    },
    {
     "id": "hive",
     "alignment": "evil",
     "module": "outbreakTeam"
    }
   ],
   "roles": [
    {
     "id": "villager",
     "team": "village"
    },
    {
     "id": "seer",
     "team": "village",
     "verbs": [
      "senseAlignment"
     ]
    },
    {
     "id": "priest",
     "team": "village",
     "verbs": [
      "protect"
     ]
    },
    {
     "id": "hexer",
     "team": "hive",
     "verbs": [
      {
       "verb": "hex",
       "feverAbility": true
      }
     ]
    },
    {
     "id": "informant",
     "team": "hive",
     "verbs": [
      "learnRole"
     ]
    },
    {
     "id": "understudy",
     "team": "hive",
     "verbs": [
      {
       "verb": "successor",
       "minAlive": 7
      }
     ]
    },
    {
     "id": "implanter",
     "team": "hive",
     "tags": [
      "leader"
     ],
     "verbs": [
      "infect"
     ]
    },
    {
     "id": "medic",
     "team": "village",
     "verbs": [
      "cure"
     ]
    },
    {
     "id": "doctor",
     "team": "village",
     "verbs": [
      "diagnose"
     ]
    }
   ],
   "options": {
    "roles": {
     "implanter": {
      "sickAfter": 0,
      "outbreakAfter": 1,
      "fevers": true,
      "feedback": true
     },
     "medic": {
      "curesSick": true,
      "unique": true
     },
     "doctor": {
      "feedback": true,
      "unique": true
     },
     "hexer": {
      "fever": false
     },
     "priest": {
      "everyNight": true
     },
     "seer": {
      "fromNight": 1
     }
    }
   }
  },
  {
   "mode": "zombie",
   "teams": [],
   "roles": [],
   "options": {
    "roles": {}
   }
  }
 ]
};
