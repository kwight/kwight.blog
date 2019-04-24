import { LitElement, html } from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { wpcomGetThumbnailUrl } from '../lib/wpcom'
import { getHumanReadableTimestamp } from '../lib/util'

const thumbnailParams = { resize: '300,300' }

class WPPost extends LitElement {
  post: {
    jetpack_featured_media_url?: string,
    date: string,
    excerpt: {
      rendered?: string
    }
    title: {
      rendered?: string
    }
    content: {
      rendered?: string
    }
  }

  view: string

  constructor() {
    super()
    this.post = {
      date: '',
      excerpt: {},
      title: {},
      content: {}
    }
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
        <div>
          <p>${getHumanReadableTimestamp(this.post.date)}</p>
          <h1>${this.post.title && unsafeHTML(this.post.title.rendered)}</h1>
        </div>
      </article>
    `
  }

  renderSingleView() {
    return html`
      <article>
        <img src="" />
        <h1>${this.post.title.rendered}</h1>
        <p>${unsafeHTML(this.post.content.rendered)}</p>
      </article>
    `
  }

  render() {
    return this.view === 'list' ? this.renderListView() : this.renderSingleView()
  }
}

customElements.define('wp-post', WPPost)
