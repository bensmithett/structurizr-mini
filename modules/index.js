import { Router } from './Router.js'
import { QuickNav } from './QuickNav.js'
import { PNGExporter } from './PNGExporter.js'

async function setup (structurizr) {
  const response = await fetch('https://raw.githubusercontent.com/structurizr/ui/main/examples/big-bank-plc.json')
  // const response = await fetch('/example/workspace.json')
  const data = await response.json()

  structurizr.workspace = new structurizr.Workspace(data)

  structurizr.ui.loadThemes(() => {
    const diagram = new structurizr.ui.Diagram('structurizr-diagram-target', false, () => {
      diagram.setNavigationEnabled(true)

      const router = new Router(diagram)
      router.setDiagram((structurizr.workspace.getViews()[0].key))
      router.syncDiagramWithURL()

      new QuickNav()
      new PNGExporter()
    })
  })
}

setup(window.structurizr)
