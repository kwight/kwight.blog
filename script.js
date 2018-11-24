class WPPosts extends HTMLElement {
  async connectedCallback () {
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/kwight.blog/posts`)
    const data = await response.json()
    window.data = data
    this.render(data)
  }

  render (data) {
    let shadow = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('post')
    data.map(post => {
      let article = template.content.cloneNode(true)
      article.querySelector('h1').innerHTML = post.title.rendered
      article.querySelector('div').innerHTML = post.content.rendered
      shadow.appendChild(article)
    })
  }
}
window.customElements.define('wp-posts', WPPosts)
