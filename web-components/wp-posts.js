import { LitElement, html } from 'lit-element';
import { wpcomFetch } from '../utils/wpcom-fetch';

class WPPosts extends LitElement {
  constructor() {
    super();
    this.posts = [];
  }

  static get properties() {
    return {
      site: { type: String },
      'per-page': { type: Number },
      posts: { type: Array },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    this.posts = await wpcomFetch(this.site, 'posts', { 'per-page': this['per-page'] });
  }

  render() {
    return html`
      ${this.posts.map((post, index) => html`
      <h1>${post.title.rendered}</h1>
    `)}
    `;
  }
}

customElements.define('wp-posts', WPPosts);
