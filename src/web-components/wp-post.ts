import { wpcomGetThumbnailUrl } from '../lib/wpcom'
import { getHumanReadableTimestamp } from '../lib/util'

const thumbnailParams = { resize: '300,300' }

class WPPost extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'single' === this.getAttribute('view') ? this.getSingleTemplate() : this.getListTemplate()
    this.render()
  }

  getListTemplate() {
    return `
      <article class="post">
        <img class="post-thumbnail" />
        <p class="post-published"></p>
        <h1 class="post-title"></h1>
      </article>
    `
  }

  getSingleTemplate() {
    return `
      <article class="post">
        <img class="post-thumbnail" />
        <h1 class="post-title"></h1>
        <div class="post-content"></div>
      </article>
    `
  }

  renderThumbnail() {
    // const thumbnailUrl = this.post.jetpack_featured_media_url
    // return thumbnailUrl && html`<img class="thumbnail" src=${wpcomGetThumbnailUrl(thumbnailUrl, thumbnailParams)} />`
  }

  renderListView() {
    const attr = this.getAttribute('post')
    if (!attr) {
      return
    }
    const post = JSON.parse(attr)
    this.querySelector('.post-published')!.innerHTML = getHumanReadableTimestamp(post.date)
    this.querySelector('.post-title')!.innerHTML = post.title.rendered
  }

  renderSingleView() {
    // return html`
    //   <article>
    //     <img src="" />
    //     <h1>${this.post.title.rendered}</h1>
    //     <p>${unsafeHTML(this.post.content.rendered)}</p>
    //   </article>
    // `
  }

  render() {
    return 'single' === this.getAttribute('view') ? this.renderSingleView() : this.renderListView()
  }
}
customElements.define('wp-post', WPPost)
