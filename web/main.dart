import 'dart:html';
import 'package:js/js.dart';
import 'lib/window.dart';
import 'lib/wpcom.dart';

final Element menu = querySelector('#menu');
final Element close = querySelector('#close');
final Element menuContent = querySelector('#menu-content');
final Element blogContent = querySelector('#blog-content');
final Element spinner = querySelector('#spinner');

void main() {
  for (final element in [menu, close]) {
    element.onClick.listen(toggleMenu);
  }

  final wpcom = WPcom(site: 'en.blog.wordpress.com');
  kwightBlog = KwightBlog(
      getPosts: allowInterop(wpcom.getPosts),
      getCategories: allowInterop(wpcom.getCategories),
      getCategoryPosts: allowInterop(wpcom.getCategoryPosts),
      getTags: allowInterop(wpcom.getTags),
      getTagPosts: allowInterop(wpcom.getTagPosts),
      search: allowInterop(wpcom.search));
}

void toggleMenu(Event _) {
  for (final element in [menu, close, menuContent, blogContent]) {
    element.classes.toggle('active');
  }
}
