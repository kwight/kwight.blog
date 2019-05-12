import { getParamsByPath } from './lib/util'
import { wpcomFetch, wpcomGetThumbnailUrl, WPcomParams } from './lib/wpcom'
import { Post } from './web-components/wp-post'

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

function renderContent(posts: Array<Post>) {
  if (!main) {
    return
  }
  posts.map((post: object) => {
    let article = document.createElement('wp-post')
    article.setAttribute('view', params.slug ? 'single' : 'list')
    article.setAttribute('post', JSON.stringify(post))
    main.appendChild(article)
  })
}

function renderNoResults() {
  if (!main) {
    return
  }
  const noResults = document.createElement('span')
  main.appendChild(noResults)
}

function renderError(error: { message: string }) {
  if (!main) {
    return
  }
  const oops = document.createElement('span')
  oops.className = 'fetch-error'
  oops.innerText = `Error 😱: ${error.message}`
  main.appendChild(oops)
}

async function fetchContent(params: WPcomParams) {
  if (!main || !spinner) {
    return
  }
  try {
    const content = await wpcomFetch(params)
    spinner.classList.toggle('active')

    if (content && content.message) {
      renderError(content)
      return
    }

    if (Array.isArray(content)) {
      if (content.length > 0) {
        renderContent(content)
      } else {
        renderNoResults()
      }
    } else {
      throw Error('Unexpected response')
    }
  } catch (error) {
    console.error(error)
  }
}

initMenu()

fetchContent(params)
