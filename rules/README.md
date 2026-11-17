# Writing a mode file: the Noxtell rules engine guide

*Rules 0.0.13. Generated from the engine's own declarations and Possession's files by the rules export; don't edit it by hand: it is rebuilt with every release.*

## 1. How a mode is made

A mode is data: one YAML file that names the engine's building blocks and
sets their numbers. The engine is written once; a mode chooses which of its
verbs each role has, which team modules and win conditions its teams use,
how the cards are dealt, and how the night runs. This guide uses
Possession (`0.0.13/possession/0.0.13.possession.yaml`) for every example.
This version also publishes Wolf (`0.0.13/wolf/0.0.13.wolf.yaml`), Fiend (`0.0.13/demon/0.0.13.demon.yaml`), Infestation (`0.0.13/brood/0.0.13.brood.yaml`), Zombie Infection (`0.0.13/zombie/0.0.13.zombie.yaml`, planned: a coming-soon stub with no rules): section 5 says which of its roles and teams use each entry.

### 1.1 The files of a version

```
0.0.13/shared/0.0.13.yaml                 the version file: table sizes, its modes, the options every mode starts from
0.0.13/possession/0.0.13.possession.yaml  a mode file: teams, roles, the deal, the night, levers
0.0.13/wolf/0.0.13.wolf.yaml              another mode file (Wolf)
0.0.13/demon/0.0.13.demon.yaml            another mode file (Fiend)
0.0.13/brood/0.0.13.brood.yaml            another mode file (Infestation)
0.0.13/zombie/0.0.13.zombie.yaml          a planned mode's coming-soon stub (Zombie Infection)
0.0.13/shared/0.0.13.night.yaml           the night's steps and timings every mode shares
0.0.13/shared/0.0.13.text.en.yaml         the words: every sentence a player sees or hears
0.0.13/shared/0.0.13.rulebook.en.yaml     the rulebook: role cards and How to play
0.0.13/possession/images/                 the mode's pictures, by slot
0.0.13/shared/images/                     pictures every mode may use
0.0.13/0.0.13.manifest.json               generated: each file's hash, each mode's fingerprint
index.json, FROZEN                        generated: the versions, and the hashes of the frozen files
```

A mode file holds no sentences. Every word a player meets lives in the text
and rulebook files, keyed by the ids the mode file gives (a role's id, an
ability's id such as `exorcist.rite`, a lever's `words`). Ids are lower case
letters, digits and `_`, and are never renamed once games have used them.

### 1.2 Options, and the order they layer in

Every number the engine reads lives in an *options* layer, and three layers
stack, key by key:

1. the version file's `options`: where every mode starts;
2. the mode file's `options`: what this mode changes;
3. each lever the host turns on at setup: its `options`, over both.

A role's parameters merge one parameter at a time, so a lever that sets one
parameter leaves the others as the mode set them. The game's header records
the options the game was played with. In Possession, the Exorcist's numbers
are set in the mode's options:

```yaml
options:
  roles:
    exorcist: {strikes: 2, feedback: {'6': false, '15': true}, unique: true}
```

and the `spareCult` lever turns one parameter of the cult on:

```yaml
- id: spareCult
  words: setup.spareCult
  default: false
  players: {min: 5, max: 15}
  options: {factions: {coven: {spareCult: true}}}
```

Section 6 lists every parameter of every Possession role and team, and who
sets it.

### 1.3 How a role gets its powers

A role names its team and its *verbs*: the engine's mechanics, each a name
from the library (section 5). A verb is used with *use keys* (when it's
called, who it may choose, which pool its pick joins: section 4) and its own
*arguments*; its *parameters* go under `options.roles.<role>`, as above.

```yaml
- {id: exorcist, team: village, verbs: [{verb: rite, pool: possession}]}
```

A team names its *team module* (how it wins, who leads it, what it knows at
the deal), the verbs its members use together (`actions`) and any extra win
conditions:

```yaml
- id: coven
  alignment: evil
  module: coven
  leader: summoner
  tone: cult
  actions: [{verb: watch, id: ghost.watch, pool: possession, pickers: dead}]
```

In Possession every pick joins the `possession` pool, which resolves the
whole night at one dawn in a fixed order. The deal is a recipe from the
library with its numbers:

```yaml
deal:
  recipe: possession
  evil: {leader: summoner, from: [[5, 1], [7, 2], [11, 3], [14, 4]]}
  cultPool: [veiler, framer, binder]
  good:
    - [exorcist, 5]
    - [guardian, 5]
    - [diviner, 7]
    - [warden, 8]
    - [chaplain, 9]
    - [seeker, 11]
    - [banisher, 12]
    - [tracker, 13]
  trickster: 13
```

### 1.4 What the loader refuses

The loader reads every file strictly, and refuses with the file, the line
and the column rather than guess:

- a key the format doesn't have (with the nearest key it does have):

```
0.0.13/possession/0.0.13.possession.yaml:93:1: unknown key "lever" (did you mean "levers"?)
```

- a parameter no reader of that role reads:

```
0.0.13/possession/0.0.13.possession.yaml:22:75: options.roles.exorcist.strike: parameter "strike" is not read by role "exorcist" (did you mean "strikes"?)
```

- a name the library doesn't have (a verb, a team module, a status...);
- a use key or a `targets` the verb doesn't take, and `uses` in Possession,
  where every role picks every night;
- a reference to a role, team or step the file doesn't define;
- a version or id that doesn't match the file's name and folder;
- a verb whose result names more than one player, without `d248`.

A mode file the loader refuses never plays: the app keeps the rules it had.

### 1.5 How a game replays exactly

A game is a record: its header (the rules version, the mode, the cards in
the box, the seed that deals them, and the options) and every request and
answer in order. The engine has no other source of chance, so the same
record replays to the same game. A version is frozen once it ships: its
files never change again (`FROZEN` lists their hashes, and each mode's
fingerprint in the manifest hashes what plays), so a game always replays
against the files it was played with.

### 1.6 How the engine grows

A new number is added the same way every time, so old games still replay:
it becomes an option (version, then mode, then lever) whose unset value is
the old behaviour; the engine owns it and everything else reads the engine;
the words state it through a placeholder; and the engine's declaration
documents it, which is where this guide comes from.

## 2. The mode file

Every key a mode file may hold, with its type in the loader's own words. Any other key is refused where the file writes it.

- `id` (an id (lower case, digits and _); required): The mode's id: lower case letters, digits and `_`. Never renamed: saves and records name it.
- `version` (a version (0.0.10); required): The version it belongs to; it must match the file's name and folder.
- `schema` (4; required): The file format's number.
- `status` (one of playable, planned, hidden; required): `playable` (offered and played), `planned` (shown as coming soon and never played, so it may leave out every key a built mode needs) or `hidden` (built, offered nowhere yet).
- `players` (an object {min, max}; required in a playable mode): The table sizes it plays.
  - `min` (an integer, at least 1; required): The smallest table.
  - `max` (an integer, at least 1; required): The largest table.
- `styles` (a list, not empty, each one of seatOrder, roleCall; required in a playable mode): The night styles it offers: `seatOrder` (the iPad passed from seat to seat) and `roleCall` (eyes closed, the roles called in turn). Possession offers `seatOrder` only.
- `defaultStyle` (one of seatOrder, roleCall, or an object; required in a playable mode): How a new setup picks the night style: one style, or `{seatOrderUpTo: N}` (seat order up to N players, role call above).
- `nights` (a size table ({upTo} or {from}); required in a playable mode): Nights before the final vote, by table size: `{upTo: {...}}` (that many players or fewer) or `{from: [[players, nights], ...]}`.
  - `upTo` (a size map ("players or fewer": value)): "players or fewer": value.
  - `from` (a list, each [players, value]): Steps: [[from players, value], ...].
- `kills` (an object; required in a playable mode): When the night kills start.
  - `nightOneFrom` (an integer, at least 1, or null; required): The table size from which the first night has a kill; below it the first kill night is night 2; `null`: never on night 1. The `killNight` condition and Possession's spirit read it.
  - `twoPerNightFrom` (an integer, at least 1, or null): `null` or left out: a second kill a night isn't built.
- `codes` (a codes object; required): Pinned forever, and never another mode's: the screen-code letter of each night style, its rulebook tab and the simulator's seed index.
  - `seatOrder` (one capital letter or digit): The screen-code letter of its seat-order nights.
  - `roleCall` (one capital letter or digit): The screen-code letter of its role-call nights.
  - `tab` (an integer from 1 to 31): Its tab in the rulebook.
  - `sim` (an integer, at least 0): The simulator's seed index.
- `tone` (one of the pinned tones): Its colours by name, one of the pinned tones (Possession: `cult`); a mode may give `colours` instead.
- `colours` (an object {fg, bg}): Its own colours, instead of a tone.
  - `fg` (a colour #rrggbb; required): The foreground colour, #rrggbb.
  - `bg` (a colour #rrggbb; required): The background colour, #rrggbb.
- `options` (an options overlay): Its overlay on the version's options: what this mode changes, key by key. Recorded in every game's header.
  - `dawn` (a list, not empty, each an id (lower case, digits and _)): The dawn step order, replacing the version's. Possession's is `[possession]`: one pooled dawn.
  - `ghostPoll` (an object): The ghost poll: each night every dead player may name one living player, and dawn names the most named in public.
    - `minVotes` (an integer, at least 0; required): The fewest ghost votes the most-named player needs to be named at dawn (a tie names nobody); `0` turns the poll off, as Possession does.
  - `ghostVotes` (an integer, at least 0): How many votes each dead player has for the whole game, at most one a ballot; unset is 1, and `0` means the dead never vote.
  - `execution` (an execution rule): Who a day vote executes. Unset: the most votes, if at least half the living, with a tie executing nobody.
    - `need` (one of atLeastHalf, overHalf, mostVotes): The bar: `atLeastHalf` (at least half the living), `overHalf` (more than half) or `mostVotes` (the most votes, whatever the count).
    - `ties` (one of none, revote): A tie for the most votes: `none` (nobody is executed) or `revote` (one more ballot, between the tied nominees only).
  - `finalVote` (a final vote rule): The final vote, after the last night.
    - `revotes` (an integer from 0 to 3): How many times a tied final vote is held again between the tied (0 to 3) before nobody is executed. Unset: once.
  - `roles` (an object): Role id to its parameters, layered over the version's parameter by parameter. Each must be one the role reads: see each library entry, and Possession's settings.
  - `factions` (an object): Team id to its parameters, layered over the version's the same way.
- `teams` (a list, each an object with "module"; required in a playable mode): Its teams, in the order their wins are checked. Each is an object with `module` (a team module from the library), these keys and the module's own arguments.
  - `module` (a name from the library; required): The team module, from the library.
  - `id` (an id (lower case, digits and _); required): The team's id: roles' `team`, options.factions and the records name it.
  - `alignment` (one of good, evil; required): Good or evil.
  - `leader` (an id (lower case, digits and _)): The role that leads it (Possession's cult: `summoner`).
  - `actions` (a list, each a verb name or an object with "verb"): Verb uses the team holds, asked of its members: each a verb use.
  - `choice` (a verb name or an object with "verb"): A team choice: one verb use the team decides.
  - `wake` (one of everyNight, window): When the team wakes on role-call nights: `everyNight`, or `window` (its role-call window, the default).
  - `sidesWith` (a list, each an id (lower case, digits and _)): Teams it sides with at parity and in the win.
  - `wins` (a list, each a win condition name or an object with "win"): Win conditions it adds to its module's own.
    - `win` (a name from the library; required): A win condition, from the library.
  - `tone` (one of the pinned tones): Its colours by name, as the mode's `tone`.
  - `colours` (an object {fg, bg}): Its own colours, instead of a tone. Its keys are those of `mode.colours`.
- `roles` (a list, each a role; required in a playable mode): Its roles, in the order the rulebook lists them.
  - `id` (an id (lower case, digits and _); required): The role's id: the words, options.roles, the deal and the records name it.
  - `team` (an id (lower case, digits and _); required): The team it starts on.
  - `codeBit` (an integer, at least 0): Its bit in a screen code's picked list.
  - `pickable` (true or false): Whether a picked list may hold it (default: whether it has a `codeBit`).
  - `persona` (a persona name): A persona from the library: what its card shows its holder instead of the truth.
  - `tags` (a list, each a tag): Names the library's entries look roles up by: `leader` (the evil leader: the village wins once none lives or the final vote executes it, and a successor takes over its card), `<team>.leader` (a third team's leader: that team wins only while it lives).
  - `verbs` (a list, each a verb name or an object with "verb"): Its powers: each a verb use.
- `statuses` (a list, each a status name or an object with "status"): The statuses from the library the mode brings in: each a name, or an object with `status` and its arguments.
  - `status` (a name from the library; required): A status, from the library.
- `deal` (an object with "recipe"; required in a playable mode): The deal: `recipe` (a deal recipe from the library) and that recipe's arguments.
  - `recipe` (a name from the library; required): The deal recipe, from the library.
- `night` (a night object; required in a playable mode): The night: role-call windows, the dawn call and the mode's own timings. The dawn's step order is the options' `dawn`.
  - `talk` (a size table ({upTo} or {from})): The day's talk time in seconds, by table size (written like `nights:`). Unset: 5 minutes.
    - `upTo` (a size map ("players or fewer": value)): "players or fewer": value.
    - `from` (a list, each [players, value]): Steps: [[from players, value], ...].
  - `finalTalk` (a size table ({upTo} or {from})): The final day's talk time in seconds, by table size. Unset: the same as `talk`.
    - `upTo` (a size map ("players or fewer": value)): "players or fewer": value.
    - `from` (a list, each [players, value]): Steps: [[from players, value], ...].
  - `roleCall` (a list, each a window ({team, roles} or {role})): Role-call windows in night order, on role-call nights: `{team, roles}` or `{role}`.
    - `team` (an id (lower case, digits and _)): A team's window: the team, its roles called in turn.
    - `roles` (a list, not empty, each an id (lower case, digits and _)): With team: the team's roles in this window, in turn.
    - `role` (an id (lower case, digits and _)): One role's window.
  - `dawnCall` (a list, each an id (lower case, digits and _)): The dawn role call's candidates, in order: each is called at dawn, eyes closed, to read its own news.
  - `timing` (an object): The mode's own step timings over the version's night data, in seconds `[min, max]`: `min` is the fixed wait, `max` when the step stops waiting.
    - `seat` ([min, max] seconds): A seat-order turn: `min` is the turn's floor, the same for every seat so the time says nothing; `max` is when its choice times out.
    - `team` ([min, max] seconds): A team's role-call window.
    - `dawnCallOpen` ([min, max] seconds): The wait before the first dawn call.
    - `dawnCallName` ([min, max] seconds): How long each dawn call shows only the role's name, inside the call's own time.
- `levers` (a list, each a lever): Optional rules the host may turn on at setup. Each is a switch: on, its `options` layer over the game's options; off, it records nothing.

## 3. The version file and its options

One file a version, `<ver>/shared/<ver>.yaml`. Its `options` are where every mode starts; the keys marked *mode and lever* can also be set in a mode's `options` and by a lever, the rest only here.

- `id` (a version (0.0.10); required): The version, such as `0.0.12`; it must match the file's name and folder.
- `schema` (4; required): The file format's number.
- `players` (an object {min, max}; required): The table sizes of the whole version. Its keys are those of `mode.players`.
- `modes` (a list, not empty, each an id (lower case, digits and _); required): The version's modes, by id.
- `options` (an options object; required): The engine options every mode starts from; a mode's `options` and its levers layer over them.
  - `dawn` (a list, not empty, each an id (lower case, digits and _); required; mode and lever): The dawn step order: the steps the night's effects resolve at, in order.
  - `misinformation` (one of plausible, coinFlip, invert; required): How an impaired player's information is made up: `plausible`, `coinFlip` or `invert`.
  - `roleChanged` (true or false; required): Whether a player whose role changed is told at dusk.
  - `ghostPoll` (an object, or null; required; mode and lever): The ghost poll, as a mode's `options.ghostPoll`; `null`: none.
    - `minVotes` (an integer, at least 0; required): The fewest ghost votes the most-named player needs to be named at dawn; `0`: no ghost poll.
  - `revealAtEnd` (true or false; required): Whether every role and team is shown at game over.
  - `noSelfVote` (true or false): Whether a ballot never offers the voter's own seat.
  - `ghostVotes` (an integer, at least 0; mode and lever): How many votes each dead player has for the whole game; unset is 1.
  - `execution` (an execution rule; mode and lever): Who a day vote executes, for every mode of the version; a mode's own `execution` replaces it (see the mode file). Its keys are those of `mode.options.execution`.
  - `finalVote` (a final vote rule; mode and lever): The final vote's revotes, for every mode of the version; a mode's own `finalVote` replaces it. Its keys are those of `mode.options.finalVote`.
  - `roles` (an object; required; mode and lever): Role id to its parameters, in every mode's games.
  - `factions` (an object; required; mode and lever): Team id to its parameters, in every mode's games.

## 4. A verb use

A role's `verbs:` and a team's `actions:` and `choice:` hold verb uses. A use is the verb's name alone (`- watch`), or an object with `verb`, any of these keys the verb takes, and the verb's own *arguments* (section 5 lists each verb's). A verb's *parameters* never go on the use: they go under `options.roles.<role>` (or `options.factions.<team>`), where the version, the mode and a lever can each set them and every game records them.

- `verb` (a name from the library; required): The verb's name, from the library.
- `id` (an ability id (owner.name)): The ability id, `owner.name` (default: the holder's id and the verb's ability, such as `exorcist.rite`). The words and the records key on it.
- `step` (a step id): The dawn step it resolves at (default: the verb's).
- `when` (a condition): When it is called: a condition (see Conditions). A condition sees only the night, the table size, the mode and the options, never what happened, so which roles are called never depends on the deal.
- `targets` (a targets object): Who it may choose, over the verb's default.
- `uses` (an integer, at least 1): Uses a game, on a verb that takes it. Refused in Possession, where every role picks every night.
- `pool` (a pool name): The pool its pick joins (Possession's: `possession`): the pool resolves every pick in it together, at its step.
- `d248` ("checked (D###)" or "owed"): Required on a verb whose result names more than one player: `owed` until the result has been checked against the rule that a private result names one player at most, then `checked (D<number>)`, naming the maintainers' decision. `owed` keeps a mode from being playable.

`targets` changes who the use may choose, over the verb's default. A verb whose effect reads one player refuses a `targets` that changes the count or says `upTo`.

- `count` (an integer, at least 0): How many distinct seats to choose (0: no choice, just "go").
- `self` (true or false): Whether the actor may choose themselves.
- `selfOnly` (true or false): The only legal choice is the holder.
- `notAlly` (true or false): Not a teammate the actor was told about.
- `alliesOnly` (true or false): Only teammates the actor was told about (and the actor, if self).
- `notLastTarget` (true or false): Not a player this card chose the night before.
- `optional` (true or false): The actor may pass instead.
- `notWith` (an id (lower case, digits and _)): Not a player carrying this status; only for a status the rules make public as it lands.
- `upTo` (true or false): `count` is a most: with fewer legal players, choose them all.
- `dead` (true or false): Choose among the dead instead of the living.
- `minDead` (an integer, at least 0): With `dead`: pass-only until at least this many players have died.

## 5. The library

Everything a mode file can name, from the engine's registries. Each entry gives its *arguments* (written where the file names it) and its *parameters* (set under `options`, by the version, the mode or a lever), each with its type, and the roles and teams of Possession, Wolf, Fiend and Infestation that use it. Entries no published mode uses yet are here too, in general words: a new mode may use them.

A verb's kind says how it plays:

- `infoNow`: answered on the holder's own turn, from the snapshot taken at the start of the night.
- `effect`: resolves at its dawn step.
- `dawnInfo`: resolves at its dawn step and tells its holder at the dawn role call.
- `team`: one pick for the whole team; the team's leader breaks a tie.
- `pooled`: its pick joins a pool, which resolves every pick together.
- `passive`: asks nothing: the engine applies it by itself.
- `trigger`: fires on a death or a change of card.
- `day`: used by day.

Two parameters recur: `feedback` (whether the holder hears the result, a flag or a flag by table size) and `fromNight` (the first night it is used, a night or a night by table size). A *size map* is `{'7': 1, '15': 2}`: the value for that many players or fewer.

### Verbs

Named in a role's `verbs:`, or a team's `actions:` or `choice:`.

#### `protect`

*`effect` · ability `<owner>.protect` · dawn step `protect` · news at the dawn call · public fact `killStopped` · statuses `protected`*

Protects one other player from tonight's night kill, not the same player two nights running unless `everyNight` is on; `fromNight` sets its first night. When its use joins a pool, as the Guardian's does in Possession, the target is `guarded` instead: tonight's kill on them fails, and nobody is told.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `fromNight` (a night, or a size map of nights); `everyNight` (true or false); `feedback` (true or false); `stopsShots` (true or false).
- Use keys: `when`, `step`, `targets`, `uses`, `pool`.
- In Possession: `guardian`.
- In Wolf: `priest`.
- In Fiend: `priest`.
- In Infestation: `priest`.

#### `rite`

*`pooled` · ability `<owner>.rite` · its private result names one player · news at the dawn call · public fact `spiritStruck` · statuses `possessed`, `guarded`, `spared`, `cast_out`, `trace`*

A strike on the spirit's host. The `strikes`-th strike casts the spirit out (the status `cast_out`); every holder of the Rite counts with the first holder's `strikes`.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `strikes` (an integer, at least 1); `feedback` (a flag, or a size map of flags).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `chaplain`, `exorcist`.

#### `groupSense`

*`pooled` · ability `<owner>.sense` · its private result names more than one player (its use needs `d248`) · news at the dawn call*

Whether the spirit is within the pick's window: the picked player and `window` players on each side (a number, a number by table size, or `{left, right}`). `reads` chooses where the spirit was (`was`) or is (`now`); with `tells: window` the result names the window's players in seat order, so its use carries `d248`.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `feedback` (a flag, or a size map of flags); `reads` (one of was, now); `window` (a number (that many each side), or a size map of numbers or {left, right}); `tells` (one of pick, window).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `diviner`.

#### `ward`

*`pooled` · ability `<owner>.ward` · its private result names one player · news at the dawn call*

The spirit can't enter the target tonight; the holder is told if it tried.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `feedback` (a flag, or a size map of flags).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `warden`.

#### `senseCult`

*`pooled` · ability `<owner>.sense` · its private result names one player · news at the dawn call*

Whether the target is in the cult, as they register tonight (a `shield` or a `frame` changes what they register as).

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `feedback` (a flag, or a size map of flags).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `seeker`.

#### `driveOut`

*`pooled` · ability `<owner>.drive` · its private result names one player · news at the dawn call*

If the target is the spirit's host, the spirit flees (where to: the cult's `fleeTo`).

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `feedback` (a flag, or a size map of flags).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `banisher`.

#### `senseSpirit`

*`pooled` · ability `<owner>.track` · its private result names one player*

Whether the spirit was in the target last night, answered on the holder's own turn; `fromNight` sets its first night.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `fromNight` (a number, or a size map of numbers).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `tracker`.

#### `watch`

*`pooled` · ability `<owner>.watch` · its private result names one player*

How many other players picked the target tonight. A team's Watch with `pickers: dead` is asked of the team's dead players, and never counted.

- Arguments (written on the use): `pickers` (one of dead).
- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `coven`, `village`, `villager`.

#### `swapVerbs`

*`pooled` · ability `<owner>.swap`*

Two players' abilities trade for the night (never a cultist's).

- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `trickster`.

#### `steer`

*`pooled` · ability `<owner>.steer`*

The spirit moves into the target. When the holder dies, its card passes down the cult's line of succession.

- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `summoner`.

#### `shield`

*`pooled` · ability `<owner>.veil`*

The target reads clean tonight.

- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `veiler`.

#### `frame`

*`pooled` · ability `<owner>.frame`*

The target reads as the spirit's host and as a cultist tonight.

- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `framer`.

#### `block`

*`pooled` · ability `<owner>.bind`*

The target's pick does nothing tonight.

- Use keys: `when`, `step`, `targets`, `pool`.
- In Possession: `binder`.

**Not used by Possession** (21; a new mode may use them):

#### `senseAlignment`

*`infoNow` · ability `<owner>.check` · its private result names one player*

Good or evil, about one other living player, from the snapshot taken at the start of the night. `fromNight` sets its first night; `checks` limits how many it makes.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `fromNight` (a night, or a size map of nights); `checks` (a count, or a size map of counts).
- Use keys: `when`, `targets`, `uses`.
- In Wolf: `seer`.
- In Fiend: `seer`.
- In Infestation: `seer`.

#### `readDead`

*`infoNow` · ability `<owner>.read` · its private result names one player*

The true role and team of every player who died since the holder's last reading, from night 2. Off when `pick` is on.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `pick` (true or false).
- Use keys: `when`, `targets`, `uses`.
- In Wolf: `medium`.
- In Fiend: `medium`.

#### `readDeadPick`

*`infoNow` · ability `<owner>.pick` · its private result names one player*

With `pick` on: once a game, after `minDead` deaths, one dead player's true role and team.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `pick` (true or false); `minDead` (an integer, at least 1).
- Use keys: `when`, `targets`, `uses`.
- In Wolf: `medium`.
- In Fiend: `medium`.

#### `swapCards`

*`effect` · ability `<owner>.swap` · dawn step `swap` · news at the dawn call*

Two other players' roles trade, if both are good; it resolves last at dawn. `usesPerGame` sets how many times a game.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `usesPerGame` (an integer, at least 0); `feedback` (true or false).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Wolf: `meddler`.
- In Fiend: `meddler`.

#### `dawnFragments`

*`passive` · ability `<owner>.sense` · its private result names one player · news at the dawn call*

At each dawn, one true fragment of the night, naming one player. `fragments` chooses which kind of fragment.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `fragments` (one of seat, either, pair); `fakeRole` (true or false).
- Use keys: `when`.
- In Wolf: `sleepless_child`.
- In Fiend: `sleepless_child`.

#### `deathShot`

*`trigger` · ability `<owner>.shoot` · public fact `death`*

When the holder dies, they shoot one player, in public. Not when they die at the final vote unless `onFinalVote` is on, nor in an outbreak unless `onOutbreak` is on.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `onFinalVote` (true or false); `onOutbreak` (true or false).
- Use keys: `targets`.
- In Wolf: `hunter`.
- In Fiend: `hunter`.

#### `attackGuard`

*`passive` · ability `<owner>.survive`*

The holder survives the first night kill against them, silently.

- Use keys: `uses`.
- In Wolf: `elder`.
- In Fiend: `elder`.

#### `revealVoteWeight`

*`day` · ability `<owner>.reveal` · public fact `roleRevealed` · statuses `revealed`*

Once a game, by day, the holder reveals their role and the app confirms it in public (the status `revealed`); from then on their vote counts `voteWeight`.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `voteWeight` (an integer, at least 1).
- Use keys: `targets`, `uses`.
- In Wolf: `mayor`.
- In Fiend: `mayor`.

#### `kill`

*`effect` · ability `<owner>.kill` · dawn step `kill` · public fact `death`*

One player dies at the kill step: the holder picks alone, one player each kill night.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Fiend: `fiend`.

#### `teamKill`

*`team` · ability `<owner>.kill` · dawn step `kill` · public fact `death`*

Every holder picks; the most-picked player dies, and the team's leader breaks a tie. No kill on night 1 below the mode's `kills.nightOneFrom`.

- Use keys: `when`, `step`, `targets`.
- In Wolf: `alpha`, `wolf`.

#### `hex`

*`effect` · ability `<owner>.hex` · dawn step `hex` · news at the dawn call · statuses `hexed`*

The target's ability fails (the status `hexed`) until `until`: the next dawn or the next dusk. With `feedback` on, the holder hears at the dawn call whether it landed. With the argument `feverAbility` and the parameter `fever` on, the holder also has a once-a-game fever, a second ability: the hex does nothing on the night it is used.

- Arguments (written on the use): `feverAbility` (true or false).
- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `until` (one of nextDawn, nextDusk); `feedback` (true or false); `fever` (true or false).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Fiend: `hexer`.
- In Infestation: `hexer`.

#### `recruit`

*`effect` · ability `<owner>.recruit` · dawn step `recruit`*

A good player joins the holder's team. Its arguments set the cap by table size (`cap`), its first night (`from`), whether a blocked recruit is spent, and whether the team dissolves when the holder dies (`onDeath`).

- Arguments (written on the use): `cap` (a count, or steps [[players, count], ...]); `from` (an integer, at least 1); `blockedSpendsRecruit` (true or false); `onDeath` (one of keep, dissolve).
- Use keys: `when`, `step`, `targets`.
- In Wolf: `cult_leader`.
- In Fiend: `cult_leader`.

#### `learnRole`

*`infoNow` · ability `<owner>.learn` · its private result names one player*

One player's true role and team, from the snapshot taken at the start of the night.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts).
- Use keys: `when`, `targets`, `uses`.
- In Fiend: `informant`.
- In Infestation: `informant`.

#### `successor`

*`trigger` · ability `<owner>.succeed`*

When the team's leader dies, the holder takes the leader's card if at least `minAlive` players live; never at the final vote.

- Arguments (written on the use): `minAlive` (an integer, at least 0).
- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `minAlive` (an integer, at least 0).
- Use keys: none beyond `verb`, `id` and its arguments.
- In Fiend: `understudy`.
- In Infestation: `understudy`.

#### `nameLeader`

*`team` · ability `<owner>.name`*

The team names its leader in play. With `leaderFromNight` set, it names one at that night's dusk; before night `leaderSuccessionBeforeNight`, losing its leader doesn't end the game while a member lives, and the team names another. With `leaderNamedWithNight` on, the first naming is asked with that night's other picks.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `leaderFromNight` (a night, or a size map of nights); `leaderSuccessionBeforeNight` (a night, or a size map of nights); `leaderNamedWithNight` (true or false).
- Use keys: none beyond `verb`, `id` and its arguments.
- In Wolf: `pack`.

#### `infect`

*`effect` · ability `<owner>.implant` · dawn step `implant` · news at the dawn call · public fact `outbreak` · statuses `infected`, `sick`, `fever`, `turned`*

Plants a hidden infection on one other player (the status `infected`): they are announced `sick` `sickAfter` dawns after it, and break out `outbreakAfter` dawns after it, dying and joining the holder's team as `turned`. A protection, a member of the holder's team or an infection already there stops it silently; with `fevers` on, a stopped infection leaves a `fever` instead, and a `sick` player can't be picked. `fromNight` sets its first night; with `feedback` on, the holder hears at the dawn call whether it took.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `sickAfter` (an integer, at least 0); `outbreakAfter` (an integer, at least 0); `fevers` (true or false); `feedback` (true or false); `fromNight` (a night, or a size map of nights).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Infestation: `implanter`.

#### `cure`

*`effect` · ability `<owner>.cure` · dawn step `cure` · news at the dawn call*

Treats one other player: an `infected` player is cured, an old `fever` breaks, and an infection planted that night is stopped (where the infection has `fevers` on; otherwise it removes the infection). With `curesSick` off, a player already `sick` gets no treatment. `timelineOf` names the role holding `infect` whose settings it reads. With `feedback` on, the holder hears at the dawn call that it worked.

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)).
- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `curesSick` (true or false); `feedback` (true or false).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Infestation: `medic`.

#### `diagnose`

*`dawnInfo` · ability `<owner>.examine` · dawn step `examine` · its private result names one player · news at the dawn call*

At its dawn call, tells the holder about one other player: a real infection, just a fever, or nothing. `feedback` turns that dawn call on.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `uses` (a count, or a size map of counts); `feedback` (true or false).
- Use keys: `when`, `step`, `targets`, `uses`.
- In Infestation: `doctor`.

#### `villageVote`

*`pooled` · ability `<owner>.vote` · dawn step `vote` · its private result names one player*

Every seat with no night ability names a suspect; the most named alone is checked, and its voters learn at the next dusk whether that player went out that night. `vote` turns it on.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `vote` (true or false).
- Use keys: `when`, `step`, `targets`.
- In Infestation: `village`.

#### `rankedMark`

*`team` · ability `<owner>.fever` · dawn step `fever` · public fact `sick` · statuses `fever`*

Each living member of the team names `fever` players (a number, or a number by table size); the fevers land on the most named, passing over a player marked tonight, then on random open seats. Each one is announced as `sick`.

- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `fever` (a count, or a size map of counts).
- Use keys: `when`, `step`.
- In Infestation: `hive`.

#### `outbreakKill`

*`team` · ability `<owner>.attack` · dawn step `kill` · public fact `death`*

The team's kill, its dead asked too, from the first night an outbreak can happen. `attack` says when it lands: at a dawn with an outbreak (`perOutbreak`), every night after the first outbreak (`afterFirstOutbreak`) or every kill night (`nightly`); `attackBy` says who picks: the whole team (`team`) or only its `turned` members. `timelineOf` names the role holding `infect` whose settings it reads.

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)).
- Parameters (under `options.roles.<role>`, or `options.factions.<team>` for a team's): `attack` (one of perOutbreak, afterFirstOutbreak, nightly); `attackBy` (one of team, turned).
- Use keys: `when`, `step`, `targets`.
- In Infestation: `hive`.

### Personas

Named in a role's `persona:`.

**Not used by Possession** (2; a new mode may use them):

#### `falseCard`

*needs 1 roles not in play*

The holder is shown a good role not in play, all game, and believes it; nothing they do works.

- In Wolf: `drunk`.
- In Fiend: `drunk`.

#### `changingCard`

*statuses `mad` · needs 2 roles not in play*

The holder is shown a different working role each night, and from night `maddensFrom` makes a living neighbour `mad` each dusk (alternating sides, good players only); with `maddensWhenImpaired` off, not on a night their own ability fails.

- Parameters (under `options.roles.<role>`): `maddensFrom` (an integer, at least 1); `maddensWhenImpaired` (true or false).
- In Wolf: `mad_hatter`.
- In Fiend: `mad_hatter`.

### Team modules

Named in a team's `module:`.

#### `village`

Good. Wins when the evil team's leader dies, or when the final vote executes them. A team adds more ways to win with `wins:`.

- Parameters (under `options.factions.<team>`): `vote` (true or false).
- In Possession: `village`.
- In Wolf: `village`.
- In Fiend: `village`.
- In Infestation: `village`.

#### `coven`

Possession's cult. Its members meet at the deal, with no disguises; it wins at parity (its members at least the rest) and when the final vote misses its Leader. It hides the spirit, draws the line of succession (`successionBeforeNight`) and tells its members where the spirit is. `fleeTo` says where a driven-out spirit goes (`neighbour` or `anywhere`); `spareCult` turns the spirit's kill on a cultist onto a neighbour; `hostActs` hides the spirit only in a seat asked that night. Built and off unless set: `alsoKills`, `alsoKillsFrom`, `unguardedFrom`, `hosts`, `steerMoves`, `strikesShared`, `quietDaysShorten`.

- Parameters (under `options.factions.<team>`): `successionBeforeNight` (a night, or a size map of nights); `fleeTo` (one of neighbour, anywhere); `spareCult` (true or false); `hostActs` (true or false); `alsoKills` (one of none, steer, newHostPick); `alsoKillsFrom` (last, a night, or a size map of nights); `unguardedFrom` (last, a night, or a size map of nights); `hosts` (an object); `steerMoves` (one of first, last); `strikesShared` (true or false); `quietDaysShorten` (true or false).
- In Possession: `coven`.

**Not used by Possession** (3; a new mode may use them):

#### `evilTeam`

Evil, led by its leader. Its members meet at the deal, with up to `disguises` good roles not in play to claim; it wins at parity (its members at least the rest) and when the final vote misses its leader.

- Parameters (under `options.factions.<team>`): `disguises` (an integer, at least 0).
- In Wolf: `pack`.
- In Fiend: `court`.

#### `cult`

A third team, siding with the teams in its `sidesWith`. `win` says how it wins: `withAllies` (if the side it is allied with wins and its leader lives, it wins with them), `leaderSurvivesShares` (its leader alive at the end: it wins as well), `leaderSurvivesOverrides` (its leader alive at the end: it wins alone) or `halfOverrides` (its leader alive and the team at least half the living at the end: it wins alone). Under `withAllies` it counts with its allies at parity, unless `parity` is off.

- Arguments (written on the use): `win` (one of halfOverrides, leaderSurvivesOverrides, leaderSurvivesShares, withAllies).
- Parameters (under `options.factions.<team>`): `win` (one of halfOverrides, leaderSurvivesOverrides, leaderSurvivesShares, withAllies); `parity` (true or false).
- In Wolf: `cult`.

#### `outbreakTeam`

Evil, as `evilTeam` is (it meets at the deal, up to `disguises` good roles from `disguisePool` to claim, and wins at parity and when the final vote misses its leader), with outbreaks: an infected player who breaks out joins it as `turned`. `turnedGhostVote` and `turnedGhostVotes` give the turned a ghost vote; `turnedLearnTeam` tells them their new team; with `sickVote` on, the sick keep their vote.

- Arguments (written on the use): `disguisePool` (a list).
- Parameters (under `options.factions.<team>`): `turnedGhostVote` (true or false); `turnedGhostVotes` (an integer, at least 0); `turnedLearnTeam` (true or false); `sickVote` (true or false); `disguises` (an integer, at least 0).
- In Infestation: `hive`.

### Pools

Named in a verb use's `pool:`.

#### `possession`

*resolves at `possession`*

Possession's one dawn: every pick that joins it resolves together, in a fixed order: Block, Swap, Shield and Frame, Protect, the Rite, the kill, Drive out, Ward, the spirit's move, then the checks and the counts.

- In Possession: `banisher`, `binder`, `chaplain`, `coven`, `diviner`, `exorcist`, `framer`, `guardian`, `seeker`, `summoner`, `tracker`, `trickster`, `veiler`, `village`, `villager`, `warden`.

### Deal recipes

Named in `deal: {recipe: ...}`.

#### `possession`

Possession's public deal: the Leader (`evil.leader`) and its helpers, drawn from `cultPool` by table size (`evil.from`); the good roles by table size in arrival order (`good`, each `[role, from players]`); Villagers for the rest; and the Trickster from `trickster` players when its lever is on. Then one shuffle.

- Arguments (written on the use): `evil` (an object); `cultPool` (a list); `good` (a list); `trickster` (an integer, at least 1).
- Parameters of the role `trickster` (`options.roles.trickster`): `module` (true or false).
- In Possession: the mode's deal.

**Not used by Possession** (5; a new mode may use them):

#### `classicDeal`

The classic deal, exact to the game's seed: the evil team by table size (`evil`), its `helpers` drawn from a pool, a shuffle drawn and set aside first (`burnHelpers`: its length, or a list of roles that long; the draws then match a deal that drew helpers from such a list), a third team from a table size (`thirdParty`), the good roles always dealt, drawn and added (`good`), public lists by table size (`picked`), the evil team's claims (`disguises`) and the roles a false card may show (`fakeRoles`).

- Arguments (written on the use): `evil` (an object); `helpers` (an object); `burnHelpers` (an integer, at least 1, or a list); `thirdParty` (an object); `good` (an object); `picked` (a size map ("players or fewer": value)); `disguises` (an object); `fakeRoles` (a list).
- In Wolf: the mode's deal.
- In Fiend: the mode's deal.

#### `outbreakDeal`

The outbreak deal, from `from` players: the evil team by table size (`evil`) with `helpers`, the good roles (`good`), public lists (`picked`), claims (`disguises`) and the roles a false card may show (`fakeRoles`).

- Arguments (written on the use): `from` (an integer, at least 1); `evil` (an object); `helpers` (an object); `good` (an object); `picked` (a size map ("players or fewer": value)); `disguises` (an object); `fakeRoles` (a list).
- In Infestation: the mode's deal.

#### `picked`

The evil team as `classicDeal` deals it (`evil`, `helpers`), then a public list of good roles by table size (`picked`).

- Arguments (written on the use): `evil` (an object); `helpers` (an object); `picked` (a size map ("players or fewer": value)).

#### `basic`

The simplest deal: the evil team by table size (`evil`), everyone else a Villager. For tests.

- Arguments (written on the use): `evil` (an object).

#### `steps`

A general deal for new modes: the evil team by table size (`evil`), the good roles always dealt, drawn or added (`good`), a third team (`thirdParty`) and the fewest Villagers (`villagerFloor`). Every draw it makes comes from the game's seed.

- Arguments (written on the use): `evil` (an object); `good` (an object); `thirdParty` (an object); `villagerFloor` (an integer, at least 0, or a list).

### Conditions

Named in a verb use's `when:`.

**Not used by Possession** (10; a new mode may use them):

#### `always`

*takes nothing*

Every night.

#### `all`

*takes a list of conditions*

Every part holds: `all: [...]`.

#### `any`

*takes a list of conditions*

Some part holds: `any: [...]`.

#### `not`

*takes a condition*

The part doesn't hold: `not: ...`.

#### `night`

*takes a value*

From night N: `night: {from: N}`, or from a parameter, `night: {from: {param: P}}` (a number, or a number by table size).

- Its value: an object.

#### `size`

*takes a value*

At these table sizes: `size: {from: N, to: M}`.

- Its value: an object.

#### `outbreakPossible`

*takes nothing*

The outbreak team's attack nights: from the first night an outbreak can happen (night 1 plus the infection's `outbreakAfter`), or every kill night when `attack` is `nightly`.

#### `killNight`

*takes nothing*

A kill night: night 2 on, and night 1 too from the mode's `kills.nightOneFrom`.

- In Wolf: `alpha`, `wolf`.
- In Fiend: `fiend`.

#### `param`

*takes a value*

When the named parameter is on: `param: P`.

- Its value: a parameter name.

#### `lastNight`

*takes nothing*

The game's last night: the mode's `nights` at this table size, which everyone knows.

### Win conditions

Named in a team's `wins:`.

#### `statusOnLiving`

The team wins once the dawn's deaths are settled while a living player carries `status` (Possession's village: `cast_out`).

- Arguments (written on the use): `status` (an id (lower case, digits and _)).
- In Possession: `village`.

**Not used by Possession** (3; a new mode may use them):

#### `deathsAtLeast`

The team wins once at least `count` players have died (a number, or steps by table size).

- Arguments (written on the use): `count` (a number, or steps [[players, n], ...]).

#### `livingAtMost`

The team wins once at most `count` players live (a number, or steps by table size).

- Arguments (written on the use): `count` (a number, or steps [[players, n], ...]).

#### `atLastDawn`

The team wins at the last night's dawn if nothing else ended the game: there is no final vote.

### Statuses

Named in the mode's `statuses:`.

#### `possessed`

The spirit's host, hidden from them; shown at game over.

- In Possession: the mode's statuses.

#### `guarded`

A Guardian's protection, to the end of dawn: stops the night kill, and is never announced.

- In Possession: the mode's statuses.

#### `spared`

The cultist the spirit's kill was turned from (the cult's `spareCult`).

- In Possession: the mode's statuses.

#### `cast_out`

The host the last strike cast the spirit out of.

- In Possession: the mode's statuses.

#### `trace`

Where the spirit read as being on a night, for the Tracker's "last night".

- In Possession: the mode's statuses.

**Not used by Possession** (9; a new mode may use them):

#### `protected`

From `protect` outside a pool: lasts to the end of dawn and stops what `stops` lists (by default a night kill, a recruit and a mark).

- Arguments (written on the use): `stops` (a list).
- In Wolf: `priest`.
- In Fiend: `priest`.
- In Infestation: `priest`.

#### `mad`

Shown a false good role for a night and the next day, and acting as a `falseCard` does: nothing the player does works.

- In Wolf: `mad_hatter`.
- In Fiend: `mad_hatter`.

#### `revealed`

The holder revealed their role by day (`revealVoteWeight`); all game.

- In Wolf: `mayor`.
- In Fiend: `mayor`.

#### `hexed`

From `hex`: the holder's ability fails until it ends.

- In Fiend: `hexer`.
- In Infestation: `hexer`.

#### `infected`

A real infection: `sick` after `sickAfter` dawns, and an outbreak after `outbreakAfter` (the player dies and joins the team, `turned`).

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)); `at` (a step id).
- In Infestation: `implanter`.

#### `sick`

Public, by name. The sick have no vote unless the team's `sickVote`; with `fevers` on, it ends (cured) once no infection or fever is left.

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)); `at` (a step id).
- In Infestation: `implanter`.

#### `fever`

Sick, as an infected player is, then it breaks at the dawn an infection would break out.

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)); `at` (a step id).
- In Infestation: `hive`, `implanter`.

#### `turned`

A player whose infection broke out: no ghost vote, or the team's `turnedGhostVotes`.

- Arguments (written on the use): `timelineOf` (an id (lower case, digits and _)); `at` (a step id).
- In Infestation: `implanter`.

#### `full_strength`

A mark that the spirit came of age early, for an ending a team wins with `statusOnLiving`. No mode uses it yet.

## 6. Possession's settings

Every parameter each of Possession's roles and teams can be given, what reads it, and the value the version, the mode or a lever sets (unset: the engine's default).

**Levers** (2):

- `trickster`: off by default, 13 to 15 players; sets `{roles: {trickster: {module: true}}}`.
- `spareCult`: off by default, 5 to 15 players; sets `{factions: {coven: {spareCult: true}}}`.

**Role `villager`**

- `unique` (true or false; read by every role)

**Role `exorcist`**

- `unique` (true or false; read by every role): `true` by the mode
- `strikes` (an integer, at least 1; read by verb rite): `2` by the mode
- `feedback` (a flag, or a size map of flags; read by verb rite): `{'6': false, '15': true}` by the mode

**Role `guardian`**

- `unique` (true or false; read by every role)
- `uses` (a count, or a size map of counts; read by verb protect)
- `fromNight` (a night, or a size map of nights; read by verb protect)
- `everyNight` (true or false; read by verb protect)
- `feedback` (true or false; read by verb protect)
- `stopsShots` (true or false; read by verb protect)

**Role `diviner`**

- `unique` (true or false; read by every role): `true` by the mode
- `feedback` (a flag, or a size map of flags; read by verb groupSense): `true` by the mode
- `reads` (one of was, now; read by verb groupSense): `was` by the mode
- `window` (a number (that many each side), or a size map of numbers or {left, right}; read by verb groupSense): `{'11': 1, '15': 2}` by the mode
- `tells` (one of pick, window; read by verb groupSense): `window` by the mode

**Role `warden`**

- `unique` (true or false; read by every role): `true` by the mode
- `feedback` (a flag, or a size map of flags; read by verb ward): `true` by the mode

**Role `seeker`**

- `unique` (true or false; read by every role): `true` by the mode
- `feedback` (a flag, or a size map of flags; read by verb senseCult): `true` by the mode

**Role `banisher`**

- `unique` (true or false; read by every role): `true` by the mode
- `feedback` (a flag, or a size map of flags; read by verb driveOut): `true` by the mode

**Role `tracker`**

- `unique` (true or false; read by every role)
- `fromNight` (a number, or a size map of numbers; read by verb senseSpirit): `2` by the mode

**Role `trickster`**

- `unique` (true or false; read by every role)
- `module` (true or false; read by deal possession): `true` by the lever trickster

**Role `summoner`**

- `unique` (true or false; read by every role)

**Role `veiler`**

- `unique` (true or false; read by every role)

**Role `framer`**

- `unique` (true or false; read by every role)

**Role `binder`**

- `unique` (true or false; read by every role)

**Role `chaplain`**

- `unique` (true or false; read by every role): `true` by the mode
- `strikes` (an integer, at least 1; read by verb rite)
- `feedback` (a flag, or a size map of flags; read by verb rite): `true` by the mode

**Team `village`**

- `vote` (true or false; read by team module village)

**Team `coven`**

- `successionBeforeNight` (a night, or a size map of nights; read by team module coven): `{'6': null, '7': 2, '15': 3}` by the mode
- `fleeTo` (one of neighbour, anywhere; read by team module coven): `neighbour` by the mode
- `spareCult` (true or false; read by team module coven): `false` by the mode, `true` by the lever spareCult
- `hostActs` (true or false; read by team module coven): `true` by the mode
- `alsoKills` (one of none, steer, newHostPick; read by team module coven)
- `alsoKillsFrom` (last, a night, or a size map of nights; read by team module coven)
- `unguardedFrom` (last, a night, or a size map of nights; read by team module coven)
- `hosts` (an object; read by team module coven)
- `steerMoves` (one of first, last; read by team module coven)
- `strikesShared` (true or false; read by team module coven)
- `quietDaysShorten` (true or false; read by team module coven)

