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
    site: 'kwight.blog',
    path: '/posts',
  }
  switch (true) {
    case '/2018/08/15/til-auto-input-yes-no-anything-to-command-prompts' === path:
    case '/2018/02/11/how-facebook-is-killing-insert-creative-income-here-and-why-i-give-money-to-amanda-palmer' === path:
    case '/2017/10/09/installing-xdebug-on-macos-high-sierra' === path:
      return { ...baseParams, 'slug': path.match(/[0-9a-z-%]*$/)!.shift() }
    case /\/search\/[0-9a-z\+]/.test(path):
      return { ...baseParams, 'search': path.match(/[0-9a-z-+%]*$/)!.shift() }
    case '/' === path:
    default:
      return baseParams
  }
}