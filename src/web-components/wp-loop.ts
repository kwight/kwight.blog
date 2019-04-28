import { wpcomFetch } from '../lib/wpcom'

class WPLoop extends HTMLElement {
  async connectedCallback() {
    const posts: object[] = await wpcomFetch('kwight.blog', 'posts')
    this.render(posts)
  }

  render(data: object[]) {
    data.map(post => {
      let article = document.createElement('wp-post')
      article.setAttribute('view', 'list')
      article.setAttribute('post', JSON.stringify(post))
      this.appendChild(article)
    })
  }
}
customElements.define('wp-loop', WPLoop)
