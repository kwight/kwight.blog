{
  const menu = document.getElementById('menu')
  const close = document.getElementById('close')
  const navigation = document.getElementById('menu-content')
  const main = document.getElementById('blog-content')
    ;[menu, close].forEach((el) => el.addEventListener('click', () => [menu, close, navigation, main].forEach((el) => el.classList.toggle('active'))))
}
