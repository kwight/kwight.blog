import { site } from './main.js';

class WPPost extends HTMLElement {
    constructor() {
        super();
        try {
            const template = document.getElementById('wp-post');
            const templateContent = template.content;
            this.attachShadow({ mode: 'open' })
                .appendChild(templateContent.cloneNode(true));
        } catch (error) {
            console.log(error);
        }
    }

    async connectedCallback() {
        try {
            const postId = this.getAttribute('postId');
            const post = await this.fetchPost(postId);
            const shadow = this.shadowRoot;
            const title = shadow.querySelector('h1');
            const featuredImage = shadow.querySelector('.featured-image');
            const date = shadow.querySelector('time');
            const content = shadow.querySelector('.content');
            title.innerText = post.title;
            date.innerText = post.date;
            content.innerHTML = post.content;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchPost(postId) {
        try {
            const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${site}/posts/${postId}`);
            return this.parsePost(await response.json());
        } catch (error) {
            console.log(error);
        }
    }

    parsePost(post) {
        return {
            title: post?.title.rendered ?? '(no title)',
            imageUrl: post?.jetpack_featured_media_url,
            date: new Date(post?.date).toDateString(),
            content: post?.content?.rendered ?? '(no content)'
        }
    }
}

customElements.define('wp-post', WPPost);
