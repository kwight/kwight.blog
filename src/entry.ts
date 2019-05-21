import { getParamsByPath } from './util'
import { wpcomFetch, wpcomGetThumbnailUrl, WPcomParams } from './wpcom'
import { Post } from './wp-post'

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
const params = getParamsByPath(location.pathname.replace(/\/$/, ''))

function initMenu() {
  [menu, close].forEach((el) => el!.addEventListener('click', () => [menu, close, navigation, main].forEach((el) => el!.classList.toggle('active'))))
}

function renderListContent(posts: Array<Post>) {
  if (!main) {
    return
  }
  posts.map((post: object) => {
    let article = document.createElement('wp-post')
    article.setAttribute('view', 'list')
    article.setAttribute('post', JSON.stringify(post))
    main.appendChild(article)
  })
}

function renderSingleContent(post: Post) {
  if (!main) {
    return
  }
  let article = document.createElement('wp-post')
  article.setAttribute('view', 'single')
  article.setAttribute('post', JSON.stringify(post))
  main.appendChild(article)
}


function renderNoResults() {
  if (!main) {
    return
  }

  const noResults = document.createElement('div')
  noResults.className = 'no-results'
  noResults.innerHTML = `
    <h1>No results found.</h1>
    <p> 🤷‍♀️</p>
  `
  main.appendChild(noResults)
}

function renderError(error: Error) {
  if (!main) {
    return
  }

  const oops = document.createElement('div')
  oops.className = 'error'
  oops.innerHTML = `
    <h1>${error.name} 😱: ${error.message}</h1>
    <p>Oops, something went wrong. Totally <em>not our fault</em>. Please refresh to try again.</p>
  `
  main.appendChild(oops)
}

async function fetchContent(params: WPcomParams) {
  if (!main || !spinner) {
    return
  }
  try {
    const content = await wpcomFetch(params)
    spinner.classList.toggle('active')

    if (content.posts) {
      if (content.posts.length > 0) {
        renderListContent(content.posts)
        return
      } else {
        renderNoResults()
        return
      }
    }

    if (content.title) {
      renderSingleContent(content)
      return
    }

    throw Error('Unexpected response')
  } catch (error) {
    renderError(error)
  }
}

initMenu()

fetchContent(params)
