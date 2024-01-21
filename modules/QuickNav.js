import sortBy from 'just-sort-by'
import autocomplete from 'autocompleter'
import fuzzysort from 'fuzzysort'
import { setURLForDiagram } from './Router.js'

export class QuickNav {
  constructor() {
    const structurizrViews = sortStructurizrViews()
    const input = document.querySelector('#searchbox')

    autocomplete({
      input,
      emptyMsg: 'No matches',
      fetch: function (text, update) {
        if (text) {
          update(
            fuzzysort.go(text, structurizrViews, { keys: ['key', 'title'] }).map(({ obj }) => obj)
          )
        } else {
          update(structurizrViews)
        }
      },
      onSelect: function ({ key }) {
        console.log(key)
        setURLForDiagram(key)
        input.blur()
        input.value = ''
      },
      render: function ({ key, title, description }) {
        const result = document.createElement('div')
        result.className = 'autocomplete-option'
        result.innerHTML = `${title ? title : key}${description ? `<br /><small>${description}</small>` : ''}`
        return result
      },
      minLength: 0,
      showOnFocus: true,
      click: (e) => e.fetch()
    })

    // open with space
    document.body.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
        if (document.activeElement !== input) {
          input.focus()
        }
      }
    })
  }
}

function sortStructurizrViews() {
  const views = { ...structurizr.workspace.views }
  delete views.configuration
  return sortBy([].concat(...Object.values(views)), ({ key }) => key)
}
