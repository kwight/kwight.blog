export interface WPcomParams {
  fields?: string,
  path: string,
  search?: string,
  site: string,
  slug?: string,
}

export async function wpcomFetch(params: WPcomParams) {
  const { site, path, slug, search } = params

  let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}${path.replace(/\/$/, '')}`
  if (slug) {
    url = `${url}/:slug=${params.slug}`
  } else if (search) {
    url = `${url}/?search=${params.search}`
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response.json()
    }
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
