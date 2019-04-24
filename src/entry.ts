import { getAttributesByPath } from './lib/util'

{
  const site = 'kwight.blog'
  const menu = document.getElementById('menu')
  const close = document.getElementById('close')
  const navigation = document.getElementById('menu-content')
  const main = document.getElementById('blog-content')
    ;[menu, close].forEach((el) => el!.addEventListener('click', () => [menu, close, navigation, main].forEach((el) => el!.classList.toggle('active'))))

  const wpPosts = document.createElement('wp-posts')
  wpPosts.setAttribute('site', site)
  const wpPost = document.createElement('wp-post')
  const attr = getAttributesByPath(location.pathname)
  if (main) {
    main.appendChild('list' === attr.view ? wpPosts : wpPost)
  }
}
