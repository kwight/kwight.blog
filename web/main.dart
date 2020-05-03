import 'dart:html';

void main() {
  final menu = querySelector('#menu');
  final close = querySelector('#close');
  final navigation = querySelector('#menu-content');
  final main = querySelector('#blog-content');
  final spinner = querySelector('#spinner');

  void toggleMenu(Event _) {
    for (final element in [menu, close, main, navigation]) {
      element.classes.toggle('active');
    }
  }

  for (final element in [menu, close]) {
    element.onClick.listen(toggleMenu);
  }
}
