import { wpcomGetThumbnailUrl } from './wpcom.js'
import { getHumanReadableTimestamp, getSecureUrl } from './util.js'

const thumbnailParams = { resize: '300,300' }
const featuredImageParams = { resize: '1200,1200' }

export interface Post {
  content: string,
  date: string,
  'featured_image': string,
  URL: string,
  title: string,
}

class WPPost extends HTMLElement {
  post!: Post;

  connectedCallback() {
    const attr = this.getAttribute('post') || ''
    this.post = JSON.parse(attr)
    this.innerHTML = 'single' === this.getAttribute('view') ? this.getSingleTemplate() : this.getListTemplate()
    this.render()
  }

  getListTemplate() {
    return `
      <a>
        <article class="post">
          <img class="post-thumbnail" />
          <p class="post-published"></p>
          <h1 class="post-title"></h1>
        </article>
      </a>
    `
  }

  getSingleTemplate() {
    return `
      <article class="post">
        <img class="post-thumbnail" />
        <p class="post-published"></p>
        <h1 class="post-title"></h1>
        <div class="post-content"></div>
      </article>
    `
  }

  renderListView() {
    const thumbnailUrl = this.post.featured_image
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, thumbnailParams))
    }
    this.querySelector('a')!.setAttribute('href', getSecureUrl(this.post.URL))
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(this.post.date)
    this.querySelector('.post-title')!.innerHTML = this.post.title
  }

  renderSingleView() {
    const thumbnailUrl = this.post.featured_image
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, featuredImageParams))
    }
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(this.post.date)
    this.querySelector('.post-title')!.innerHTML = this.post.title
    this.querySelector('.post-content')!.innerHTML = this.post.content
  }

  render() {
    return 'single' === this.getAttribute('view') ? this.renderSingleView() : this.renderListView()
  }
}
customElements.define('wp-post', WPPost)
