import { WPcomParams } from './wpcom';

export function getHumanReadableTimestamp(timestamp: string): string {
  return new Date(timestamp)
    .toLocaleString(undefined, {
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
  }
  switch (true) {
    case '/2018/08/15/til-auto-input-yes-no-anything-to-command-prompts' === path:
    case '/2018/02/11/how-facebook-is-killing-insert-creative-income-here-and-why-i-give-money-to-amanda-palmer' === path:
    case '/2017/10/09/installing-xdebug-on-macos-high-sierra' === path:
    case '/2017/03/22/i-should-probably-blog-this' === path:
    case '/2016/09/03/programmers-dont-need-to-be-smart' === path:
    case '/2016/07/22/create-react-app-and-mvps' === path:
    case '/2016/06/25/til-node-app-deployment-with-ssl' === path:
    case '/2016/06/19/til-https-sites-are-not-so-hard-any-more' === path:
    case '/2015/07/24/a-tale-of-two-developers' === path:
    case '/2015/05/30/sebastian-markbage-minimal-api-surface-area' === path:
    case '/2015/05/25/fears' === path:
    case '/2015/05/02/theming-in-the-future' === path:
    case '/2015/04/27/lets-tango' === path:
    case '/2015/04/03/kirk-wight-a-call-for-simplicity' === path:
    case '/2015/03/22/the-webs-grain-by-frank-chimero' === path:
    case '/2012/12/02/adding-a-logo-uploader-to-your-wordpress-site-with-the-theme-customizer' === path:
    case '/2015/03/14/its-not-simple-designing-simple-things' === path:
    case '/2015/02/02/material-of-un-ambiguity' === path:
    case '/2014/12/22/lemp-stack-on-yosemite' === path:
    case '/2014/12/10/new-theme-twenty-fifteen' === path:
    case '/2014/12/08/on-api-correctness' === path:
    case '/2014/10/07/json-in-the-chrome-inspector' === path:
    case '/2014/10/01/what-wordpress-themes-are-really-about-and-wordpress-4-1' === path:
    case '/2014/09/17/morten-rand-hendriksen-future-responsive-today-embracing-mobile-first-with-and-flexbox' === path:
    case '/2014/08/07/simple-testing-of-different-git-commits' === path:
    case '/2014/08/02/how-to-tail-a-log-with-live-server-clock' === path:
    case '/2014/07/25/debugging-theme-mods' === path:
    case '/2014/07/05/evolving-the-customizer' === path:
    case '/2014/06/28/life-is-hard-enough' === path:
    case '/2014/06/11/rest-development-console-now-open-source' === path:
    case '/2014/06/09/state-of-drupal-and-wordpress-notes' === path:
    case '/2014/04/03/fundamentals-of-theme-development' === path:
    case '/2014/02/19/tell-us-what-you-think' === path:
    case '/2014/02/11/world-wide-online-protest-against-nsa-surveillance' === path:
    case '/2014/01/06/css-flexbox-model' === path:
    case '/2013/09/12/stop-fighting-with-css-widths-involving-padding-and-borders' === path:
    case '/2013/09/04/email-forwarding-on-wordpress-com' === path:
    case '/2013/08/23/create-presentations-easily-on-wordpress-com-with-shortcodes' === path:
    case '/2013/08/11/a-new-look-for-kwight-ca' === path:
    case '/2013/04/11/putting-posts-on-a-pedestal-with-jetpacks-featured-content' === path:
    case '/2013/01/22/using-the-wordpress-theme-customizer-to-choose-between-excerpts-or-full-content' === path:
    case '/2012/01/31/montreal-dev-meetup-demystifying-the-theme-review-process' === path:
    case '/2012/04/23/adding-a-sub-menu-indicator-to-parent-menu-items' === path:
    case '/2012/08/31/getting-started-with-wordpress-theme-development' === path:
    case '/2012/11/13/changing-html-markup-for-wordpress-galleries' === path:
    case '/2012/11/09/jetpack-and-wordpress-com-accounts' === path:
    case '/2012/11/05/no-need-for-that-locale-business-anymore' === path:
    case '/2012/10/31/19' === path:
    case '/2012/10/30/what-why-how' === path:
    case '/2011/10/02/using-xml-to-define-translatable-strings-in-wpml' === path:
    case '/2011/08/11/getting-the-most-out-of-wordpress-premium-themes' === path:
    case '/2011/07/26/woothemes-and-doing-it-right' === path:
    case '/2011/07/12/wordcamp-montreal-2011' === path:
    case '/2011/06/30/error-establishing-a-database-connection' === path:
    case '/2011/06/26/cleaning-up-urls' === path:
      return {
        ...baseParams,
        slug: path.match(/[0-9a-z-%]*$/)!.shift(),
        fields: 'content,date,featured_image,title',
      }
    case /\/search\/[0-9a-z\+]/.test(path):
      return {
        ...baseParams,
        search: path.match(/[0-9a-z-+%]*$/)!.shift(),
      }
    case '/' === path:
    default:
      return baseParams
  }
}

export function getSecureUrl(url: string) {
  try {
    const secureUrl = new URL(url)
    secureUrl.protocol = 'https'
    return secureUrl.href
  } catch (error) {
    return ''
  }
}