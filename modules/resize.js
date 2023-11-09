export function observeResizes (diagram, nav) {
  const observer = new ResizeObserver(() => {
    // diagram.resize()
    // nav.resetZoom()
    // diagram.zoomToWidthOrHeight()
  })
  observer.observe(document.body)
}
