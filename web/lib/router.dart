import 'constants.dart';
import 'wpcom.dart';

class Router {
  WPcomParams getParamsByPath(String path) {
    var params = WPcomParams(
      blog: blog,
      fields: 'date,featured_image,title,URL',
      path: '/posts',
    );
    switch (path) {
      case '':
        return params;
      case '/2018/08/15/til-auto-input-yes-no-anything-to-command-prompts':
      case '/2018/02/11/how-facebook-is-killing-insert-creative-income-here-and-why-i-give-money-to-amanda-palmer':
      case '/2017/10/09/installing-xdebug-on-macos-high-sierra':
      case '/2017/03/22/i-should-probably-blog-this':
      case '/2016/09/03/programmers-dont-need-to-be-smart':
      case '/2016/07/22/create-react-app-and-mvps':
      case '/2016/06/25/til-node-app-deployment-with-ssl':
      case '/2016/06/19/til-https-sites-are-not-so-hard-any-more':
      case '/2015/07/24/a-tale-of-two-developers':
      case '/2015/05/30/sebastian-markbage-minimal-api-surface-area':
      case '/2015/05/25/fears':
      case '/2015/05/02/theming-in-the-future':
      case '/2015/04/27/lets-tango':
      case '/2015/04/03/kirk-wight-a-call-for-simplicity':
      case '/2015/03/22/the-webs-grain-by-frank-chimero':
      case '/2012/12/02/adding-a-logo-uploader-to-your-wordpress-site-with-the-theme-customizer':
      case '/2015/03/14/its-not-simple-designing-simple-things':
      case '/2015/02/02/material-of-un-ambiguity':
      case '/2014/12/22/lemp-stack-on-yosemite':
      case '/2014/12/10/new-theme-twenty-fifteen':
      case '/2014/12/08/on-api-correctness':
      case '/2014/10/07/json-in-the-chrome-inspector':
      case '/2014/10/01/what-wordpress-themes-are-really-about-and-wordpress-4-1':
      case '/2014/09/17/morten-rand-hendriksen-future-responsive-today-embracing-mobile-first-with-and-flexbox':
      case '/2014/08/07/simple-testing-of-different-git-commits':
      case '/2014/08/02/how-to-tail-a-log-with-live-server-clock':
      case '/2014/07/25/debugging-theme-mods':
      case '/2014/07/05/evolving-the-customizer':
      case '/2014/06/28/life-is-hard-enough':
      case '/2014/06/11/rest-development-console-now-open-source':
      case '/2014/06/09/state-of-drupal-and-wordpress-notes':
      case '/2014/04/03/fundamentals-of-theme-development':
      case '/2014/02/19/tell-us-what-you-think':
      case '/2014/02/11/world-wide-online-protest-against-nsa-surveillance':
      case '/2014/01/06/css-flexbox-model':
      case '/2013/09/12/stop-fighting-with-css-widths-involving-padding-and-borders':
      case '/2013/09/04/email-forwarding-on-wordpress-com':
      case '/2013/08/23/create-presentations-easily-on-wordpress-com-with-shortcodes':
      case '/2013/08/11/a-new-look-for-kwight-ca':
      case '/2013/04/11/putting-posts-on-a-pedestal-with-jetpacks-featured-content':
      case '/2013/01/22/using-the-wordpress-theme-customizer-to-choose-between-excerpts-or-full-content':
      case '/2012/01/31/montreal-dev-meetup-demystifying-the-theme-review-process':
      case '/2012/04/23/adding-a-sub-menu-indicator-to-parent-menu-items':
      case '/2012/08/31/getting-started-with-wordpress-theme-development':
      case '/2012/11/13/changing-html-markup-for-wordpress-galleries':
      case '/2012/11/09/jetpack-and-wordpress-com-accounts':
      case '/2012/11/05/no-need-for-that-locale-business-anymore':
      case '/2012/10/31/19':
      case '/2012/10/30/what-why-how':
      case '/2011/10/02/using-xml-to-define-translatable-strings-in-wpml':
      case '/2011/08/11/getting-the-most-out-of-wordpress-premium-themes':
      case '/2011/07/26/woothemes-and-doing-it-right':
      case '/2011/07/12/wordcamp-montreal-2011':
      case '/2011/06/30/error-establishing-a-database-connection':
      case '/2011/06/26/cleaning-up-urls':
      case '/presentations/demystifying-wordpress-theme-review':
      case '/presentations/getting-started-with-wordpress-theme-development':
      case '/presentations/fundamentals-of-wordpress-theme-development':
        final regexp = RegExp(r'[0-9a-z-]*$');
        return params
          ..slug = regexp.firstMatch(path).toString()
          ..fields = 'content,date,featured_image,title';
      case '/presentations':
        return params
          ..parentId = presentationsCategoryId
          ..type = 'page';
      case '/contact':
        return params..slug = path;
      // case /\/search\/[0-9a-z\+]/.test(path):
      //   return {
      //     ...baseParams,
      //     search: path.match(/[0-9a-z-+%]*$/)!.shift(),
      //   };
      default:
        return params..path = '404';
    }

    if (path == '/presentations') {
      return params
        ..parentId = presentationsCategoryId
        ..type = 'page';
    }
  }
}
