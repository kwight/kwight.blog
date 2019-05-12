import { wpcomGetThumbnailUrl } from '../lib/wpcom'
import { getHumanReadableTimestamp } from '../lib/util'

const thumbnailParams = { resize: '300,300' }
const featuredImageParams = { resize: '1200,1200' }

export interface Post {
  title: {
    rendered: string,
  },
  jetpack_featured_media_url: string,
  link: string,
  date: string,
  content: {
    rendered: string,
  },
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
    const thumbnailUrl = this.post.jetpack_featured_media_url
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, thumbnailParams))
    }
    this.querySelector('a')!.setAttribute('href', this.post.link)
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(this.post.date)
    this.querySelector('.post-title')!.innerHTML = this.post.title.rendered
  }

  renderSingleView() {
    const thumbnailUrl = this.post.jetpack_featured_media_url
    if (thumbnailUrl) {
      this.querySelector('.post-thumbnail')!.setAttribute('src', wpcomGetThumbnailUrl(thumbnailUrl, featuredImageParams))
    }
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(this.post.date)
    this.querySelector('.post-title')!.innerHTML = this.post.title.rendered
    this.querySelector('.post-content')!.innerHTML = this.post.content.rendered
  }

  render() {
    return 'single' === this.getAttribute('view') ? this.renderSingleView() : this.renderListView()
  }
}
customElements.define('wp-post', WPPost)
