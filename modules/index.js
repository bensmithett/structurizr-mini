import { Router } from './Router.js'
import { QuickNav } from './QuickNav.js'
import { PNGExporter } from './PNGExporter.js'
import { WindowResizeHandler } from './WindowResizeHandler.js'

async function setup(structurizr) {
  // Used for development
  // const response = await fetch('https://raw.githubusercontent.com/structurizr/ui/main/examples/big-bank-plc.json')
  // const response = await fetch('/example/workspace.json')

  const response = await fetch('workspace.json')
  const data = await response.json()

  structurizr.workspace = new structurizr.Workspace(data)

  structurizr.ui.loadThemes(() => {
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

  const navResponse = await fetch('/nav.json')
  const nav = await navResponse.json()

  document.querySelector('.nav-links').innerHTML = nav.links
    .map(({ text, href }) => `<a href='${href}' target='_blank'>${text}</a>`)
    .join('')
}

setup(window.structurizr)
