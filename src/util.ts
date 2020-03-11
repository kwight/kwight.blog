import { WPcomParams } from './wpcom.js';

export function getHumanReadableTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function getParamsByPath(path: string): WPcomParams {
  const baseParams = {
    fields: 'date,featured_image,title,URL',
    path: '/posts',
    site: 'kwight.blog',
  };
  // prettier-ignore
  switch (true) {
    case path === '/2018/08/15/til-auto-input-yes-no-anything-to-command-prompts':
    case path === '/2018/02/11/how-facebook-is-killing-insert-creative-income-here-and-why-i-give-money-to-amanda-palmer':
    case path === '/2017/10/09/installing-xdebug-on-macos-high-sierra':
    case path === '/2017/03/22/i-should-probably-blog-this':
    case path === '/2016/09/03/programmers-dont-need-to-be-smart':
    case path === '/2016/07/22/create-react-app-and-mvps':
    case path === '/2016/06/25/til-node-app-deployment-with-ssl':
    case path === '/2016/06/19/til-https-sites-are-not-so-hard-any-more':
    case path === '/2015/07/24/a-tale-of-two-developers':
    case path === '/2015/05/30/sebastian-markbage-minimal-api-surface-area':
    case path === '/2015/05/25/fears':
    case path === '/2015/05/02/theming-in-the-future':
    case path === '/2015/04/27/lets-tango':
    case path === '/2015/04/03/kirk-wight-a-call-for-simplicity':
    case path === '/2015/03/22/the-webs-grain-by-frank-chimero':
    case path === '/2012/12/02/adding-a-logo-uploader-to-your-wordpress-site-with-the-theme-customizer':
    case path === '/2015/03/14/its-not-simple-designing-simple-things':
    case path === '/2015/02/02/material-of-un-ambiguity':
    case path === '/2014/12/22/lemp-stack-on-yosemite':
    case path === '/2014/12/10/new-theme-twenty-fifteen':
    case path === '/2014/12/08/on-api-correctness':
    case path === '/2014/10/07/json-in-the-chrome-inspector':
    case path === '/2014/10/01/what-wordpress-themes-are-really-about-and-wordpress-4-1':
    case path === '/2014/09/17/morten-rand-hendriksen-future-responsive-today-embracing-mobile-first-with-and-flexbox':
    case path === '/2014/08/07/simple-testing-of-different-git-commits':
    case path === '/2014/08/02/how-to-tail-a-log-with-live-server-clock':
    case path === '/2014/07/25/debugging-theme-mods':
    case path === '/2014/07/05/evolving-the-customizer':
    case path === '/2014/06/28/life-is-hard-enough':
    case path === '/2014/06/11/rest-development-console-now-open-source':
    case path === '/2014/06/09/state-of-drupal-and-wordpress-notes':
    case path === '/2014/04/03/fundamentals-of-theme-development':
    case path === '/2014/02/19/tell-us-what-you-think':
    case path === '/2014/02/11/world-wide-online-protest-against-nsa-surveillance':
    case path === '/2014/01/06/css-flexbox-model':
    case path === '/2013/09/12/stop-fighting-with-css-widths-involving-padding-and-borders':
    case path === '/2013/09/04/email-forwarding-on-wordpress-com':
    case path === '/2013/08/23/create-presentations-easily-on-wordpress-com-with-shortcodes':
    case path === '/2013/08/11/a-new-look-for-kwight-ca':
    case path === '/2013/04/11/putting-posts-on-a-pedestal-with-jetpacks-featured-content':
    case path === '/2013/01/22/using-the-wordpress-theme-customizer-to-choose-between-excerpts-or-full-content':
    case path === '/2012/01/31/montreal-dev-meetup-demystifying-the-theme-review-process':
    case path === '/2012/04/23/adding-a-sub-menu-indicator-to-parent-menu-items':
    case path === '/2012/08/31/getting-started-with-wordpress-theme-development':
    case path === '/2012/11/13/changing-html-markup-for-wordpress-galleries':
    case path === '/2012/11/09/jetpack-and-wordpress-com-accounts':
    case path === '/2012/11/05/no-need-for-that-locale-business-anymore':
    case path === '/2012/10/31/19':
    case path === '/2012/10/30/what-why-how':
    case path === '/2011/10/02/using-xml-to-define-translatable-strings-in-wpml':
    case path === '/2011/08/11/getting-the-most-out-of-wordpress-premium-themes':
    case path === '/2011/07/26/woothemes-and-doing-it-right':
    case path === '/2011/07/12/wordcamp-montreal-2011':
    case path === '/2011/06/30/error-establishing-a-database-connection':
    case path === '/2011/06/26/cleaning-up-urls':
    case path === '/presentations/demystifying-wordpress-theme-review':
    case path === '/presentations/getting-started-with-wordpress-theme-development':
    case path === '/presentations/fundamentals-of-wordpress-theme-development':
      return {
        ...baseParams,
        slug: path.match(/[0-9a-z-%]*$/)!.shift(),
        fields: 'content,date,featured_image,title',
      };
    case '/presentations' === path:
      return {
        ...baseParams,
        parentId: 1328,
        type: 'page',
      };
    case /\/search\/[0-9a-z\+]/.test(path):
      return {
        ...baseParams,
        search: path.match(/[0-9a-z-+%]*$/)!.shift(),
      };
    case '/' === path:
    default:
      return baseParams;
  }
}

export function getSecureUrl(url: string) {
  try {
    const secureUrl = new URL(url);
    secureUrl.protocol = 'https';
    return secureUrl.href;
  } catch (error) {
    return '';
  }
}
