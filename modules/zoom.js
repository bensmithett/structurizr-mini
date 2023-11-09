export function setupZoom (diagram) {
  document.querySelector('#zoomIn').addEventListener('click', () => {
    // Just one zoom isn't enough zoom
    diagram.zoomIn()
    diagram.zoomIn()
  })
  document.querySelector('#zoomOut').addEventListener('click', () => {
    diagram.zoomOut()
    diagram.zoomOut()
  })
}