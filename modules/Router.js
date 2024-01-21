import history from 'history/browser'
import panzoom from 'panzoom'

export class Router {
  #diagram
  #zoom

  constructor(diagram) {
    this.#diagram = diagram
    this.#diagram.onElementDoubleClicked(this.handleElementDoubleClick)
    history.listen(this.handleLocationChange)
  }

  syncDiagramWithURL() {
    if (getKeyFromURL(history.location)) {
      this.handleLocationChange(history)
    } else {
      setURLForDiagram(structurizr.workspace.getViews()[0].key)
    }
  }

  handleElementDoubleClick = (event, elementId) => {
    const element = structurizr.workspace.findElementById(elementId)

    console.log(element.type)

    switch (element.type) {
      case structurizr.constants.SOFTWARE_SYSTEM_ELEMENT_TYPE:
        this.navigateToSoftwareSystem(element)
        break
      case structurizr.constants.CONTAINER_ELEMENT_TYPE:
        this.navigateToContainer(element)
        break
      default:
        // TODO: Probably should go down to component & code for completeness
        alert(`Unhandled element type: ${element.type}`)
    }
  }

  handleLocationChange = ({ location }) => {
    const search = new URLSearchParams(location.search)
    const key = getKeyFromURL(location)

    if (key && key !== this.#diagram.getCurrentView().key) {
      this.setDiagram(key)
    }
  }

  navigateToSoftwareSystem(element) {
    // TODO: Display a spinner while rendering
    const view = this.#diagram.getCurrentView()
    let views

    if (
      view.type === structurizr.constants.SYSTEM_LANDSCAPE_VIEW_TYPE ||
      view.softwareSystemId !== element.id
    ) {
      views = structurizr.workspace.findSystemContextViewsForSoftwareSystem(element.id)
      if (!views.length) views = structurizr.workspace.findContainerViewsForSoftwareSystem(element.id)
    } else if (view.type === structurizr.constants.SYSTEM_CONTEXT_VIEW_TYPE) {
      views = structurizr.workspace.findContainerViewsForSoftwareSystem(element.id)
    }

    if (views.length) setURLForDiagram(views[0].key)
  }

  navigateToContainer(element, diagram) {
    const views = structurizr.workspace.findComponentViewsForContainer(element.id)
    if (views.length) setURLForDiagram(views[0].key)
  }

  setDiagram = (key) => {
    this.#diagram.changeView(key, this.resetZoom)
  }

  resetZoom = () => {
    const svg = document.querySelector('#structurizr-diagram-target svg')

    if (this.#zoom) {
      this.#zoom.dispose()
      svg.style.removeProperty('transform')
    }

    svg.style.setProperty('padding', svg.parentElement.style.getPropertyValue('margin'))

    this.#zoom = panzoom(svg, {
      minZoom: 0.3,
      smoothScroll: false,
      bounds: true,
      // We're using double clicks to navigate, not zoom
      zoomDoubleClickSpeed: 1,
    })
  }
}

export function setURLForDiagram (key) {
  const search = new URLSearchParams(history.location.search)
  search.set('diagram', key)
  history.push({ search: search.toString() })
}

function getKeyFromURL(location) {
  const search = new URLSearchParams(location.search)
  return search.get('diagram')
}
