import { Router, isEmbedded } from './Router.js'
import { QuickNav } from './QuickNav.js'
import { PNGExporter } from './PNGExporter.js'
import { WindowResizeHandler } from './WindowResizeHandler.js'
import { Dom } from './Dom.js'

async function setup(structurizr) {
  const dom = new Dom()

  const data = await fetchWorkspace()
  const nav = await fetchNavConfig()

  structurizr.workspace = new structurizr.Workspace(data)

  structurizr.ui.loadThemes(() => {
    dom.insertNavLinks(nav.links)
    dom.removeLoading(isEmbedded())

    const diagram = new structurizr.ui.Diagram('structurizr-diagram-target', false, () => {
      diagram.setNavigationEnabled(true)

      const router = new Router(diagram)
      router.setDiagram(structurizr.workspace.getViews()[0].key)
      router.syncDiagramWithURL()

      new QuickNav()
      new PNGExporter(diagram, window.joint)
      new WindowResizeHandler(diagram)
    })
  })
}

async function fetchWorkspace() {
  // Used for development
  // const response = await fetch('https://raw.githubusercontent.com/structurizr/ui/main/examples/big-bank-plc.json')
  // const response = await fetch('/example/workspace.json')
  const response = await fetch('workspace.json')
  return await response.json()
}

async function fetchNavConfig() {
  const navResponse = await fetch('nav.json')
  return await navResponse.json()
}

setup(window.structurizr)
