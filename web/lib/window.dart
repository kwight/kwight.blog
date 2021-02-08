@JS()
library window;

import 'package:js/js.dart';

@anonymous
@JS()
class KwightBlog {
  external factory KwightBlog(
      {Function getPosts,
      Function getCategories,
      Function(int id) getCategoryPosts,
      Function getTags,
      Function(int id) getTagPosts,
      Function(String term) search});
}

@JS()
external set kwightBlog(KwightBlog obj);
@JS()
external KwightBlog get kwightBlog;

/// https://stackoverflow.com/questions/45812372/how-do-i-create-a-global-on-the-window-object-in-dart-lang