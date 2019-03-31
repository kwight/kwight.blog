class WPPost extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.template = document.createElement('template')
        this.template.innerHTML = getWPPostTemplate()
    }
    async connectedCallback() {
        const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${this.site}/posts?per_page=${this.perPage}`)
        const data = await response.json()
        // TODO: Remove this eventually
        window.data = data
        this.render(data)
    }

    get postId() {
        return this.getAttribute('post-id')
    }

    get format() {
        return this.getAttribute('format') || 'full'
    }

    static get observedAttributes() {
        return ['post-id', 'format']
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
window.customElements.define('wp-post', WPPost)

function getWPPostTemplate() {
    return `  
    <article class="post">
      <h1 class="post-title"></h1>
      <div class="post-content"></div>
    </article>
  `;
}