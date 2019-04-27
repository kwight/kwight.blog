import { wpcomFetch } from '../lib/wpcom'
import './wp-post'

const blogContent = document.getElementById('blog-content')

class WPPosts extends HTMLElement {
  async connectedCallback() {
    const posts = await wpcomFetch('kwight.blog', 'posts')
    this.render(posts)
  }

  render(data: Array<object>) {
    data.map(post => {
      let article = document.createElement('wp-post')
      article.setAttribute('view', 'list')
      article.setAttribute('post', JSON.stringify(post))
      blogContent!.appendChild(article)
    })
  }
}
customElements.define('wp-posts', WPPosts)
