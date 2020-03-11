export interface WPcomParams {
  fields?: string;
  parentId?: number;
  path: string;
  search?: string;
  site: string;
  slug?: string;
  type?: string;
}

export async function wpcomFetch(params: WPcomParams) {
  const { fields, parentId, path, search, site, slug, type } = params;
  const encodedFields = fields && `fields=${encodeURIComponent(fields)}`;
  let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}${path.replace(
    /\/$/,
    ''
  )}`;

  switch (true) {
    case !!slug:
      url = `${url}/slug:${params.slug}${fields && '?' + encodedFields}`;
      break;
    case !!parentId && !!type:
      url = `${url}/?type=${type}&parent_id=${params.parentId}${fields &&
        '&' + encodedFields}`;
      break;
    case !!type:
      url = `${url}/?type=${params.type}${fields && '&' + encodedFields}`;
      break;
    case !!search:
      url = `${url}/?search=${params.search}${fields && '&' + encodedFields}`;
      break;
    case !!fields:
      url = `${url}${fields && '?' + encodedFields}`;
      break;
    default:
      break;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  } catch (error) {
    return error;
  }
}

export function wpcomGetThumbnailUrl(url: string, params: {}) {
  url = url.replace(/\/$/, '');
  if (params) {
    url = `${url}?${new URLSearchParams(params)}`;
  }
  return url;
}
