import 'dart:html';

final Element menu = querySelector('#menu');
final Element close = querySelector('#close');
final Element menuContent = querySelector('#menu-content');
final Element blogContent = querySelector('#blog-content');
final Element spinner = querySelector('#spinner');

void main() {
  for (final element in [menu, close]) {
    element.onClick.listen(toggleMenu);
  }
}

void toggleMenu(Event _) {
  for (final element in [menu, close, menuContent, blogContent]) {
    element.classes.toggle('active');
  }
}
