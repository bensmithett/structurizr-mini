// import { setupNavigation } from './navigate.js'
import { Navigation } from './navigation.js'
import { observeResizes } from './resize.js'
import { setupZoom } from './zoom.js'
import { setupModal } from './modal.js'

async function setup () {
  // const response = await fetch('https://raw.githubusercontent.com/structurizr/ui/main/examples/big-bank-plc.json')
  const response = await fetch('/example/workspace.json')
  const data = await response.json()

  structurizr.workspace = new structurizr.Workspace(data)

  structurizr.ui.loadThemes(() => {
    const diagram = new structurizr.ui.Diagram('diagram', false, () => {
      diagram.setNavigationEnabled(true)

      const nav = new Navigation(diagram)
      nav.setDiagram((structurizr.workspace.getViews()[0].key))
      nav.syncDiagramWithURL()

      // diagram.changeView(structurizr.workspace.getViews()[0].key)
      
      // setupNavigation(diagram)
      // setupZoom(diagram)
      
      observeResizes(diagram, nav)
    })

    window.d = diagram

    document.querySelector('#export').addEventListener('click', () => {
      diagram.exportCurrentDiagramToPNG(false, false, (dataURI) => {
        joint.util.downloadDataUri(dataURI, `${diagram.getCurrentView().key}.png`)
      })
    })

    setupModal()
  })
}

setup()
