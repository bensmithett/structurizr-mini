<img src='./docs/banner.jpg' width='512' alt='Structurizr Mini' />

A static site for C4 diagrams from a [Structurizr](https://structurizr.com) workspace. Just the diagrams — [docs](https://docs.structurizr.com/dsl/docs) and [ADRs](https://docs.structurizr.com/dsl/adrs) in the workspace are ignored.

## Features

- Diagrams look the same as they do in official [Structurizr tools](https://structurizr.com/products). [Themes](https://structurizr.com/help/themes) just work.
- Zoom and pan with mousewheel or trackpad (like Google Maps, Lucidchart, Miro, etc).
- Simplified UI with [quick navigation](https://docs.structurizr.com/ui/quick-navigation) and [fuzzy search](https://github.com/farzher/fuzzysort)
- PNG export
- Customisable nav — link to your own supplemental docs, source code, etc

## Instructions

- Download and unzip the latest [release](https://github.com/bensmithett/structurizr-mini/releases) somewhere that can serve static files over HTTP
- Put your `workspace.json` in the same place
- Go to `http://[YOUR SERVER]/index.html`

How you get a `workspace.json` depends on your workflow and where your source of truth lives.

## Workflow 1: Structurizr Cloud/On-Premises

The source of truth for your workspace is in the Cloud/On-Premises instance. Use [Structurizr CLI's `pull`](https://docs.structurizr.com/cli/pull) to [export](https://structurizr.com/help/workspace-export-and-import) `workspace.json`.

## Workflow 2: `workspace.dsl` as source of truth

A `workspace.dsl` committed to version control is your source of truth.

You're not using Structurizr Cloud or On-Premises (or if you are, it's just as one publish target for your diagrams)

The CLI can export that file to JSON...

```
structurizr-cli export -workspace workspace.dsl -format json
```

⚠️ however `workspace.dsl` **does not include any diagram layout info** and the CLI alone will not create it.

### Where does your layout info live?

#### `autoLayout`

Structurizr's Lite/Cloud/On-Prem diagram viewer applies [Graphviz](https://graphviz.org) on the server when you view a diagram. Mini can't do that — it's just static files — so you need to pre-generate layout info at build time. There's an [easy way to do this:](https://github.com/structurizr/cli/issues/62#issuecomment-999623728)

1. [Install Graphviz](https://graphviz.org/download/) so the `dot` command is available

2. Create a wrapper DSL file (e.g. `graphviz.dsl`) that extends your JSON workspace, and applies graphviz.
```
workspace extends workspace.json {
  !script groovy {
    new com.structurizr.graphviz.GraphvizAutomaticLayout().apply(workspace);
  }
}
```

3. Use the CLI to export *that* workspace to JSON
```bash
structurizr-cli export -workspace graphviz.dsl -format json
```

#### Manual layout

If you don't rely exclusively on `autoLayout` and use Lite to manually edit diagrams, those manual edits are [auto-saved](https://docs.structurizr.com/lite/usage#auto-save) to a `workspace.json` that Lite is already generating for you.

You may wish to commit this file, and can then treat it as a complete source of truth and use directly with Mini.

Personally I just rely on `autoLayout` and `gitignore` the `workspace.json` generated by Lite. (*Occasionally* I comment out an `autoLayout` line and manually tweak a view to export from Lite for a specific purpose).

Syncing and persisting manual layouts is handled much more comprehensively when using [Cloud or On-Premises](https://structurizr.com/help/workflow) — I suggest going that way if manual layout is important.

