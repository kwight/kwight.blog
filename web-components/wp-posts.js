import { LitElement, html } from 'lit-element';

class WPPosts extends LitElement {
  render() {
    return html`  
    <article class="post">
      <h1 class="post-title"></h1>
      <div class="post-content"></div>
    </article>
  `;
  }
}
