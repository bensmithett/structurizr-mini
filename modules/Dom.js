export class Dom {
  #loading
  #nav
  #diagram
  #navLinks

  constructor() {
    this.#loading = document.querySelector('.layout__loading')
    this.#nav = document.querySelector('.layout__nav')
    this.#diagram = document.querySelector('.layout__diagram')
    this.#navLinks = document.querySelector('.nav-links')
  }

  insertNavLinks = (links) => {
    this.#navLinks.innerHTML = links
      .map(({ text, href }) => `<a href='${href}' target='_blank'>${text}</a>`)
      .join('')
  }

  removeLoading = (isEmbedded) => {
    this.#loading.classList.add('is-hidden')
    this.#diagram.classList.remove('is-hidden')
    if (!isEmbedded) {
      this.#nav.classList.remove('is-hidden')
    }
  }
}
