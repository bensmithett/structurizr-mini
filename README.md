# Structurizr Mini

C4 diagrams from a [Structurizr](https://structurizr.com) workspace on a static site.

## Features

- Diagrams rendered with the [same code](https://github.com/structurizr/ui) as the official Structurizr [tools](https://structurizr.com/products) so...
  - [Themes](https://structurizr.com/help/themes) just work
  - Diagrams look the same everywhere. Keep using Structurizr tools as part of your workflow (I still use [Lite](https://structurizr.com/help/lite) for local diagram editing)
- Zoom and pan with mousewheel or trackpad (like Google Maps, Lucid, Miro, etc)
- [Quick navigation](https://docs.structurizr.com/ui/quick-navigation) with the [world's best fuzzy search](https://github.com/farzher/fuzzysort)
- PNG export
- Customisable header — link to your own supplemental docs, source code, etc
- Fully self-contained static site — no embeds or references to external assets

## Quick instructions

- Download and unzip the latest [release](https://github.com/bensmithett/structurizr-mini/releases) somewhere that can serve static files over HTTP
- Put your `workspace.json` in the same place
- Go to `http://[YOUR SERVER]/index.html`

### How to get a `workspace.json`?

TODO

## Contributing

### Importing assets from [structurizr/ui](https://github.com/structurizr/ui)

This project uses JS & CSS from [structurizr/ui](https://github.com/structurizr/ui) to render diagrams and work with a [JSON workspace](https://github.com/structurizr/cli/blob/master/docs/export.md).

To enable this, structurizr/ui is included as a git submodule. I'm putting this here because I can never remember submodule commands...

```
# After cloning
git submodule update --init --recursive
# To pull in latest changes
git submodule update --recursive --remote
```

structurizr/ui's JS is old school globals (no modules, UMD, or IIFE) so we need to manually bundle and move to `public` for Vite to include it in the final build.

```
pnpm import-structurizr-scripts
```
