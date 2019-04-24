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

interface AttributesByPath {
  'view': string,
  'slug': string | undefined,
}

export function getAttributesByPath(path: string): AttributesByPath {
  switch (path) {
    case '/2018/08/15/til-auto-input-yes-no-anything-to-command-prompts':
    case '/2018/02/11/how-facebook-is-killing-insert-creative-income-here-and-why-i-give-money-to-amanda-palmer':
    case '/2017/10/09/installing-xdebug-on-macos-high-sierra':
      return { 'view': 'single', 'slug': path.match(/[0-9a-z-%]*$/)!.shift() }
    case '/':
    default:
      return { 'view': 'list', 'slug': undefined }
  }
}