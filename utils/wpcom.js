export const apiBase = 'https://public-api.wordpress.com/wp/v2'

export async function wpcomFetch (site, path, params = {}) {
  if (!site || !path) {
    return
  }
  params = new URLSearchParams(params)
  const response = await fetch(`${apiBase}/sites/${site}/${path}/?${params}`)
  return response.json()
}

export function wpcomGetThumbnailUrl (url, params = {}) {
  const params = new URLSearchParams(params)
  return `${url}/?${params}`
}
