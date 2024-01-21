export class WindowResizeHandler {
  constructor(diagram) {
    const observer = new ResizeObserver(() => {
      diagram.resize()
      diagram.zoomToWidthOrHeight()
    })
    observer.observe(document.body)
  }
}
