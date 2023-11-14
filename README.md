# Structurizr Mini

C4 diagrams from a [Structurizr](https://structurizr.com) workspace on a static site.

## Features

- Diagrams rendered with the [same code](https://github.com/structurizr/ui) as the official Structurizr [tools](https://structurizr.com/products) so...
  - [Themes](https://structurizr.com/help/themes) just work
  - Diagrams look the same everywhere, so you can mix & match Structurizr tools (I still use [Lite](https://structurizr.com/help/lite) for local diagram editing)
- Zoom and pan with mousewheel or trackpad (like Google Maps, Lucid, Miro, etc)
- Simplified UI with [quick navigation](https://docs.structurizr.com/ui/quick-navigation) and [fuzzy search](https://github.com/farzher/fuzzysort)
- PNG export
- Customisable nav — link to your own supplemental docs, source code, etc
- Just diagrams. [Docs](https://docs.structurizr.com/dsl/docs) or [ADRs](https://docs.structurizr.com/dsl/adrs) in the workspace are ignored.

## Instructions

- Download and unzip the latest [release](https://github.com/bensmithett/structurizr-mini/releases) somewhere that can serve static files over HTTP
- Put your `workspace.json` in the same place
- Go to `http://[YOUR SERVER]/index.html`

How you get a `workspace.json` depends on your Structurizr workflow.

### Structurizr Cloud/On-Premises [workflow](https://structurizr.com/help/workflow)

The source of truth for your diagrams (including diagram layout information) is the Cloud/On-Premises instance.

Use [Structurizr CLI's `pull`](https://docs.structurizr.com/cli/pull) to get a `workspace.json`

### `autoLayout` Everything workflow

A `workspace.json` generated from a `workspace.dsl` won't include any `autoLayout` information by default. Structurizr's Lite/Cloud/On-Prem diagram viewer applies [Graphviz](https://graphviz.org) on the server when you view a diagram. Mini can't do that — it's just static files — so you need to pre-generate autolayouts.

TODO

