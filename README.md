# Noxtell rules

Rules files for **Noxtell**, a social deduction game played around one iPad. The iPad runs the night, so everyone
plays.

## What's here
- **Two modes, as data files** ([rules/0.0.13/](rules/0.0.13/)):
  - **Possession**: the iPad is passed round, everyone picks every night, and one player is possessed without knowing
    it.
  - **Wolf**: classic Werewolf. The pack wakes together every night; from 13 players, by default, the iPad calls roles by name.

  Each mode file holds its roles, what each one does, the deal by table size, how each side wins and the night order.
  The words players read and hear are beside it.
- **The engine guide** ([rules/README.md](rules/README.md)): every building block a mode file can use, generated from
  the engine.
- **The role builder (beta)**, live at https://pauliver.github.io/noxtell-rules/: drag the engine's building blocks
  onto a role, set them, and copy the role's YAML. It checks the file's shape against the schema; the full rules check
  runs when the app loads the file. Its page is in [docs/](docs/). Nothing you build there is sent anywhere.

## Releases
Each release is a tag, `rules/<version>/<number>`. Everything under `rules/` and `docs/` is generated and checked by
Noxtell's export tool; only this README, the license and the contributing note are written by hand.

The app ships with its rules built in. Builds for outside testers will check these tags for newer rules; none has
shipped yet.

## License
**All rights reserved.** See [LICENSE](LICENSE). You may read these files. You may not reuse them without permission.

## Contributing
**Contributions are not open yet.** When they open, contributors will sign a Contributor License Agreement, and the
steps will be in [CONTRIBUTING.md](CONTRIBUTING.md). Until then, pull requests can't be accepted.
