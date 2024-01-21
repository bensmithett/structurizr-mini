export class PNGExporter {
  constructor (diagram, joint) {
    document.querySelector('#export').addEventListener('click', () => {
      diagram.exportCurrentDiagramToPNG(false, false, (dataURI) => {
        joint.util.downloadDataUri(dataURI, `${diagram.getCurrentView().key}.png`)
      })
    })
  }
}
