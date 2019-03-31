export const apiBase = 'https://public-api.wordpress.com/wp/v2';

export async function wpcomFetch(site = null, path = null, params = {}) {
    if (!site || !path) {
        return;
    }
    params = new URLSearchParams(params);
    const response = await fetch(`${apiBase}/sites/${site}/${path}/?${params}`);
    return response.json();
}
