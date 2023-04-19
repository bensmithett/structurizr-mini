import sortBy from './sortBy.js'
import { setURLForDiagram } from './navigate.js'

export function sortStructurizrViews() {
  const views = { ...structurizr.workspace.views }
  delete views.configuration
  return sortBy([].concat(...Object.values(views)), ({ key }) => key)
}

export function setupView() {
  const structurizrViews = sortStructurizrViews()
  const input = document.querySelector('#searchbox')

  let modalIsOpen = false


  const dialog = new A11yDialog(document.querySelector('#modal'))
  dialog.on('show', () => {
    modalIsOpen = true
    input.focus()
  })
  dialog.on('hide', () => {
    input.value = ''
    modalIsOpen = false
  })

  autocomplete({
    input,
    emptyMsg: 'No matches',
    fetch: function (text, update) {
      update(fuzzysort.go(text, structurizrViews, { key: 'key' }).map(({ obj }) => obj))
    },
    onSelect: function ({ key }) {
      dialog.hide()
      setURLForDiagram(key)
    },
    render: function ({ key }) {
      const result = document.createElement('div')
      result.innerHTML = key
      return result
    }
  })

  window.addEventListener('keyup', (event) => {
    if (!modalIsOpen && event.key === 't') {
      dialog.show()
    }
  })
}
