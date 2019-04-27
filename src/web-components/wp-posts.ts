import { LitElement, html, customElement, property } from 'lit-element'
import { wpcomFetch } from '../lib/wpcom'
import './wp-post'

@customElement('wp-posts')
class WPPosts extends LitElement {
  'per-page': number
  posts: Array<Object>
  site: string

  constructor() {
    super()
    this.posts = []
    this.site = ''
  }

  static get properties() {
    return {
      site: { type: String },
      'per-page': { type: Number },
      posts: { type: Array }
    }
  }

  async connectedCallback() {
    super.connectedCallback()
    this.posts = await wpcomFetch(this.site, 'posts', { 'per-page': this['per-page'] })
  }

  render() {
    return html`
      ${this.posts.map((post) => html`
        <wp-post view="list" .post=${post}></wp-post>
      `)}
    `
  }
}
