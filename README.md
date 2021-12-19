# Web Components

## Dev setup
- `brew install fswatch`
- From this folder, run `fswatch -o . | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'`
- `npx serve` from `public` (assumes Node is installed)
- `npm install -g firebase-tools` for most recent version
- deploy with `firebase deploy`