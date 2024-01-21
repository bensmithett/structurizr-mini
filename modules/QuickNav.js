import sortBy from 'just-sort-by'
import autocomplete from 'autocompleter'
import fuzzysort from 'fuzzysort'
import { setURLForDiagram } from './Router.js'

export class QuickNav {
  constructor () {
    const structurizrViews = sortStructurizrViews()
    const input = document.querySelector('#searchbox')

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
        console.log(key)
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
  }
}

function sortStructurizrViews() {
  const views = { ...structurizr.workspace.views }
  delete views.configuration
  return sortBy([].concat(...Object.values(views)), ({ key }) => key)
}
