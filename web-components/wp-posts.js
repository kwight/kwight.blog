import { LitElement, html } from 'lit-element'
import { wpcomFetch } from '../utils/wpcom'
import './wp-post'

class WPPosts extends LitElement {
  constructor () {
    super()
    this.posts = []
  }

  static get properties () {
    return {
      site: { type: String },
      'per-page': { type: Number },
      posts: { type: Array }
    }
  }

  async connectedCallback () {
    super.connectedCallback()
    this.posts = await wpcomFetch(this.site, 'posts', { 'per-page': this['per-page'] })
  }

  render () {
    return html`
      ${this.posts.map((post, index) => html`
        <wp-post view="list" .post=${post}></wp-post>
      `)}
    `
  }
}

customElements.define('wp-posts', WPPosts)