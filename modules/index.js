import { setupNavigation } from './navigate.js'
import { observeResizes } from './resize.js'
import { setupZoom } from './zoom.js'
import { setupModal } from './modal.js'

async function setup () {
  // const response = await fetch('https://raw.githubusercontent.com/structurizr/ui/main/examples/big-bank-plc.json')
  const response = await fetch('/example/workspace.json')
  const data = await response.json()

  structurizr.workspace = new structurizr.Workspace(data)

  const diagram  = new structurizr.ui.Diagram('diagram', false, () => {
    diagram.changeView(structurizr.workspace.getViews()[0].key)

    setupNavigation(diagram)
    setupZoom(diagram)
    observeResizes(diagram)
  })

  diagram.setNavigationEnabled(true)

  document.querySelector('#export').addEventListener('click', () => {
    diagram.exportCurrentDiagramToPNG(true, false, (dataURI) => {
      joint.util.downloadDataUri(dataURI, `${diagram.getCurrentView().key}.png`)
    })
  })

  setupModal()
}

setup()
