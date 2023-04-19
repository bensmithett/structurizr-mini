export function setupZoom (diagram) {
  document.querySelector('#zoomIn').addEventListener('click', () => {
    diagram.zoomIn()
  })
  document.querySelector('#zoomOut').addEventListener('click', () => {
    diagram.zoomOut()
  })
}