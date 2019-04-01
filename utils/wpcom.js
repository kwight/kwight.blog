const apiBase = 'https://public-api.wordpress.com/wp/v2'

async function wpcomFetch (site, path, params) {
  if (!site || !path) {
    return
  }
  let url = `${apiBase}/sites/${site}/${path.replace(/\/$/, '')}`
  if (params) {
    url = `${url}?${new URLSearchParams(params)}`
  }
  const response = await fetch(url)
  return response.json()
}

function wpcomGetThumbnailUrl (url, params) {
  url = url.replace(/\/$/, '')
  if (params) {
    url = `${url}?${new URLSearchParams(params)}`
  }
  return url
}

export { apiBase, wpcomFetch, wpcomGetThumbnailUrl }
