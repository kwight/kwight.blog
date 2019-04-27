import { LitElement, html, customElement, property } from 'lit-element'
import { wpcomFetch } from '../lib/wpcom'
import './wp-post'

@customElement('wp-posts')
class WPPosts extends LitElement {
  @property({ type: Array })
  posts = []

  async connectedCallback() {
    super.connectedCallback()
    this.posts = await wpcomFetch('kwight.blog', 'posts')
  }

  render() {
    return html`
      ${this.posts.map((post) => html`
        <wp-post view="list" .post=${post}></wp-post>
      `)}
    `
  }
}
