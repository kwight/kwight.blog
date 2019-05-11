import { wpcomGetThumbnailUrl } from '../lib/wpcom'
import { getHumanReadableTimestamp } from '../lib/util'

const thumbnailParams = { resize: '300,300' }
const featuredImageParams = { resize: '1200,1200' }

class WPPost extends HTMLElement {
  connectedCallback() {
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
    const attr = this.getAttribute('post')
    if (!attr) {
      return
    }
    const post = JSON.parse(attr)
    const thumbnailUrl = post.jetpack_featured_media_url
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, thumbnailParams))
    }
    this.querySelector('a')!.setAttribute('href', post.link)
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(post.date)
    this.querySelector('.post-title')!.innerHTML = post.title.rendered
  }

  renderSingleView() {
    const attr = this.getAttribute('post')
    if (!attr) {
      return
    }
    const post = JSON.parse(attr)
    const thumbnailUrl = post.jetpack_featured_media_url
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, featuredImageParams))
    }
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(post.date)
    this.querySelector('.post-title')!.innerHTML = post.title.rendered
    this.querySelector('.post-content')!.innerHTML = post.content.rendered
  }

  render() {
    return 'single' === this.getAttribute('view') ? this.renderSingleView() : this.renderListView()
  }
}
customElements.define('wp-post', WPPost)
