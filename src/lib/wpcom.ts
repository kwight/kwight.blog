export const apiBase = 'https://public-api.wordpress.com/wp/v2'

export interface WPcomParams {
  site: string,
  path: string,
  slug?: string,
  search?: string,
}

export async function wpcomFetch(params: WPcomParams) {
  const { site, path, slug, search } = params

  let url = `${apiBase}/sites/${site}/${path.replace(/\/$/, '')}`
  if (slug) {
    url = `${url}/slug:${params.slug}`
  } else if (search) {
    url = `${url}?${new URLSearchParams(search)}`
  }

  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    return error
  }
}

export function wpcomGetThumbnailUrl(url: string, params: {}) {
  url = url.replace(/\/$/, '')
  if (params) {
    url = `${url}?${new URLSearchParams(params)}`
  }
  return url
}
