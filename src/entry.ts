import { getParamsByPath } from './lib/util'
import { wpcomFetch, wpcomGetThumbnailUrl, WPcomParams } from './lib/wpcom'

declare global {
  interface Window { kwightBlog: any; }
}

window.kwightBlog = {}
window.kwightBlog.wpcomFetch = wpcomFetch
window.kwightBlog.wpcomGetThumbnailUrl = wpcomGetThumbnailUrl
window.kwightBlog.getParamsByPath = getParamsByPath

const menu = document.getElementById('menu')
const close = document.getElementById('close')
const navigation = document.getElementById('menu-content')
const main = document.getElementById('blog-content')

function initMenu() {
  [menu, close].forEach((el) => el!.addEventListener('click', () => [menu, close, navigation, main].forEach((el) => el!.classList.toggle('active'))))
}

async function fetchContent(params: WPcomParams) {
  if (!main) {
    return
  }
  const content = await wpcomFetch(params)
  content.map((post: object) => {
    let article = document.createElement('wp-post')
    article.setAttribute('view', 'list')
    article.setAttribute('post', JSON.stringify(post))
    main.appendChild(article)
  })
}

initMenu()
fetchContent(getParamsByPath(location.pathname))
