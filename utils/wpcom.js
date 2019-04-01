const apiBase = 'https://public-api.wordpress.com/wp/v2'

async function wpcomFetch (site, path, params = {}) {
  if (!site || !path) {
    return
  }
  params = new URLSearchParams(params)
  const response = await fetch(`${apiBase}/sites/${site}/${path}/?${params}`)
  return response.json()
}

function wpcomGetThumbnailUrl (url, params = {}) {
  params = new URLSearchParams(params)
  return `${url}/?${params}`
}

export { apiBase, wpcomFetch, wpcomGetThumbnailUrl }
