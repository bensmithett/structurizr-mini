import history from 'history/browser'
import Panzoom from '@panzoom/panzoom'

export class Router {
  #diagram
  #panzoom

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

    if (element.url) window.open(element.url, '_blank')

    switch (element.type) {
      case structurizr.constants.SOFTWARE_SYSTEM_ELEMENT_TYPE:
        this.navigateToSoftwareSystem(element)
        break
      case structurizr.constants.CONTAINER_ELEMENT_TYPE:
        this.navigateToContainer(element.id)
        break
      case structurizr.constants.CONTAINER_INSTANCE_ELEMENT_TYPE:
        this.navigateToContainer(element.containerId)
        break
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
      if (!views.length)
        views = structurizr.workspace.findContainerViewsForSoftwareSystem(element.id)
    } else if (view.type === structurizr.constants.SYSTEM_CONTEXT_VIEW_TYPE) {
      views = structurizr.workspace.findContainerViewsForSoftwareSystem(element.id)
    }

    if (views.length) setURLForDiagram(views[0].key)
  }

  navigateToContainer(id) {
    const views = structurizr.workspace.findComponentViewsForContainer(id)
    if (views.length) setURLForDiagram(views[0].key)
  }

  setDiagram = (key) => {
    this.#diagram.changeView(key, this.resetZoom)
  }

  resetZoom = () => {
    if (this.#panzoom) this.#panzoom.destroy()

    const el = document.querySelector('#structurizr-diagram-target-canvas')
    this.#panzoom = Panzoom(el, { canvas: true })

    const handleWheel = (event) => {
      // Mousewheel scrolls and trackpad scrolls result in wildly different zoom speeds
      // if using panzoom's default zoomWithWheel
      // https://github.com/timmywil/panzoom/issues/586
      const delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY
      const scale = this.#panzoom.getScale()
      const toScale = scale * Math.exp((delta * 0.3 * -1) / 300)
      const result = this.#panzoom.zoomToPoint(toScale, event)
    }

    el.parentElement.addEventListener('wheel', handleWheel)
  }
}

export function setURLForDiagram(key) {
  const search = new URLSearchParams(history.location.search)
  search.set('diagram', key)
  history.push({ search: search.toString() })
}

function getKeyFromURL(location) {
  const search = new URLSearchParams(location.search)
  return search.get('diagram')
}
