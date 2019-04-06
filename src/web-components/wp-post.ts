import { LitElement, html } from './lit-element'
import { wpcomGetThumbnailUrl } from '../utils/wpcom'
import { getHumanReadableTimestamp } from '../utils/time'

const thumbnailParams = { resize: '300,300' }

class WPPost extends LitElement {
  post: {
    jetpack_featured_media_url: string
  };
  view: string;
  constructor() {
    super()
    this.post = {},
      this.view = 'single'
  }

  static get properties() {
    return {
      post: { type: Object },
      view: { type: String }
    }
  }

  renderThumbnail() {
    const thumbnailUrl = this.post.jetpack_featured_media_url
    return thumbnailUrl && html`<img src=${wpcomGetThumbnailUrl(thumbnailUrl, thumbnailParams)} />`
  }

  renderListView() {
    return html`
      <article>
        ${this.renderThumbnail()}
        <p>${getHumanReadableTimestamp(this.post.date)}</p>
        <h1>${this.post.title && this.post.title.rendered}</h1>
      </article>
    `
  }

  renderSingleView() {
    return html`
      <article>
        <img src="" />
        <h1>${this.post.title.rendered}</h1>
        <p>${this.post.excerpt.rendered}</p>
      </article>
    `
  }

  render() {
    return this.view === 'list' ? this.renderListView() : this.renderSingleView()
  }
}

customElements.define('wp-post', WPPost)
