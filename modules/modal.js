import sortBy from 'just-sort-by'
import A11yDialog from 'a11y-dialog'
import autocomplete from 'autocompleter'
import fuzzysort from 'fuzzysort'
import { setURLForDiagram } from './navigate.js'

function sortStructurizrViews() {
  const views = { ...structurizr.workspace.views }
  delete views.configuration
  return sortBy([].concat(...Object.values(views)), ({ key }) => key)
}

export function setupModal() {
  const structurizrViews = sortStructurizrViews()
  const input = document.querySelector('#searchbox')

  // let modalIsOpen = false

  // const dialog = new A11yDialog(document.querySelector('#modal'))
  // dialog.on('show', () => {
  //   modalIsOpen = true
  //   input.focus()
  // })
  // dialog.on('hide', () => {
  //   input.value = ''
  //   modalIsOpen = false
  // })

  autocomplete({
    input,
    emptyMsg: 'No matches',
    fetch: function (text, update) {
      if (text) {
        update(fuzzysort.go(text, structurizrViews, { key: 'key' }).map(({ obj }) => obj))
      } else {
        update(structurizrViews)
      }
    },
    onSelect: function ({ key }) {
      setURLForDiagram(key)
      input.blur()
      input.value = ''
    },
    render: function ({ key, description }) {
      const result = document.createElement('div')
      result.className = 'autocomplete-option'
      result.innerHTML = `${key}<br /><small>${description}</small>`
      return result
    },
    minLength: 0,
    click: e => e.fetch()
  })

  // window.addEventListener('keyup', (event) => {
  //   if (!modalIsOpen && event.key === 't') {
  //     dialog.show()
  //   }
  // })
}
