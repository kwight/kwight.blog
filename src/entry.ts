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
const spinner = document.getElementById('spinner')
const params = getParamsByPath(location.pathname)

function initMenu() {
  [menu, close].forEach((el) => el!.addEventListener('click', () => [menu, close, navigation, main].forEach((el) => el!.classList.toggle('active'))))
}

async function fetchContent(params: WPcomParams) {
  if (!main) {
    return
  }
  const content = await wpcomFetch(params)
  spinner!.classList.toggle('active')
  content.map((post: object) => {
    let article = document.createElement('wp-post')
    article.setAttribute('view', params.slug ? 'single' : 'list')
    article.setAttribute('post', JSON.stringify(post))
    main.appendChild(article)
  })
}

initMenu()
fetchContent(params)
