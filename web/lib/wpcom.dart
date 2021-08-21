import 'dart:convert';
import 'dart:html';
import 'package:meta/meta.dart';

class WPcom {
  WPcom({@required this.site}) {
    baseUrl = 'https://public-api.wordpress.com/wp/v2/sites/$site';
  }
  final String site;
  String baseUrl;

  Future<List<Object>> getPosts() => makeGetRequest('$baseUrl/posts');

  Future<List<Object>> getCategories() => makeGetRequest('$baseUrl/categories');

  Future<List<Object>> getCategoryPosts(int id) =>
      makeGetRequest('$baseUrl/posts?categories=$id');

  Future<List<Object>> getTags() => makeGetRequest('$baseUrl/tags');

  Future<List<Object>> getTagPosts(int id) =>
      makeGetRequest('$baseUrl/posts?tags=$id');

  Future<List<Object>> search(String term) =>
      makeGetRequest('$baseUrl/search?search=$term');

  Future<List<Object>> makeGetRequest(String url) async {
    try {
      final response = await HttpRequest.getString(url);
      return jsonDecode(response) as List<Object>;
    } on Exception catch (error) {
      return [
        {
          'error': error.toString(),
        }
      ];
    }
  }
}

class WPcomParams {
  WPcomParams(
      {@required this.blog,
      this.fields,
      this.path,
      this.parentId,
      this.slug,
      this.type});
  final String blog;
  String fields;
  String path;
  int parentId;
  String slug;
  String type;
}
