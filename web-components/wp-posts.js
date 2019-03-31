class WPPosts extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.template = document.createElement('template')
    this.template.innerHTML = getWPPostsTemplate()

    this.state = {
      posts: {}
    }
  }
  async connectedCallback() {
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${this.site}/posts?per_page=${this.perPage}`)
    const data = await response.json()
    // TODO: Remove this eventually
    this.state.posts = data
    this.render(data)
    document.getElementById('spinner').classList.toggle('active')
    this.classList.toggle('active')
  }

  get site() {
    return this.getAttribute('site')
  }

  get perPage() {
    return this.getAttribute('per-page') || 10
  }

  static get observedAttributes() {
    return ['site', 'per-page']
  }

  render(data) {
    if (!Array.isArray(data)) {
      return
    }
    data.map(post => {
      let article = this.template.content.cloneNode(true)
      article.querySelector('h1').innerHTML = post.title.rendered
      article.querySelector('div').innerHTML = post.content.rendered
      this.shadowRoot.appendChild(article)
    })
  }
}
window.customElements.define('wp-posts', WPPosts)

function getWPPostsTemplate() {
  return `  
    <article class="post">
      <h1 class="post-title"></h1>
      <div class="post-content"></div>
    </article>
  `;
}