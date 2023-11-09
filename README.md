# Structurizr Mini

C4 diagrams from your [Structurizr](https://structurizr.com) workspace on a static site.

- 🟦 Renders using [structurizr/ui](https://github.com/structurizr/ui) so diagrams look exactly the same as they do in Structurizr
- 🔎 [Zoom and pan](https://github.com/anvaka/panzoom) diagrams with mousewheel or trackpad (like Google Maps)
- 🔦 Simple navigation and the [world's best fuzzy search](https://github.com/farzher/fuzzysort) for finding diagrams
- 🖼️ PNG export
- 🔗 Customisable header links

## Usage

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
