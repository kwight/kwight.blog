import { LitElement, html } from 'lit-element'

class WPPost extends LitElement {
  constructor () {
    super()
    this.post = {}
  }

  static get properties () {
    return {
      post: { type: Object }
    }
  }

  render () {
    return html`
      <h1>${this.post.title.rendered}</h1>
    `
  }
}

customElements.define('wp-post', WPPost)
