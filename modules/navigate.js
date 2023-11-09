// import history from './history.js'
import history from 'history/browser'

let diagram, zoom

export function setupNavigation(d) {
  diagram = d

  diagram.onElementDoubleClicked(handleElementDoubleClick)
  history.listen(handleLocationChange)

  if (getKeyFromURL(history.location)) {
    handleLocationChange(history)
  } else {
    setURLForDiagram(structurizr.workspace.getViews()[0].key)
  }
}

function handleElementDoubleClick(event, elementId) {
  const element = structurizr.workspace.findElementById(elementId)

  switch (element.type) {
    case structurizr.constants.SOFTWARE_SYSTEM_ELEMENT_TYPE:
      navigateToSoftwareSystem(element)
      break
    case structurizr.constants.CONTAINER_ELEMENT_TYPE:
      navigateToContainer(element)
      break
    default:
      alert(`Unhandled element type: ${element.type}`)
  }
}

function navigateToSoftwareSystem(element) {
  const view = diagram.getCurrentView()
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

function navigateToContainer (element, diagram) {
  const views = structurizr.workspace.findComponentViewsForContainer(element.id)
  if (views.length) setURLForDiagram(views[0].key)
}

export function setURLForDiagram (key) {
  const search = new URLSearchParams(history.location.search)
  search.set('diagram', key)
  history.push({ search: search.toString() })
}

function handleLocationChange ({ location }) {
  const search = new URLSearchParams(location.search)
  const key = getKeyFromURL(location)
  if (key && key !== diagram.getCurrentView().key) {
    setDiagram(key)
  }
}

export function setDiagram(key) {
  if (zoom) zoom.dispose()

  console.log(key, '********')
  diagram.changeView(key)
  zoom = panzoom(document.querySelector('#v-2'), {
    minZoom: 1,
    smoothScroll: false,
    bounds: true,
    boundsPadding: 0.5,
    /*
    beforeWheel: function(e) {
      // allow wheel-zoom only if altKey is down. Otherwise - ignore
      var shouldIgnore = !e.altKey;
      return shouldIgnore;
    },*/
    /*
    beforeMouseDown: function(e) {
      // allow mouse-down panning only if altKey is down. Otherwise - ignore
      var shouldIgnore = !e.altKey;
      return shouldIgnore;
    }*/
    
  })
}

function getKeyFromURL(location) {
  const search = new URLSearchParams(location.search)
  return search.get('diagram')
}
