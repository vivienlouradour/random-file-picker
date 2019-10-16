# Random File Picker (random-file-picker)

Electron app for picking random files

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m electron
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build
quasar build -m electron --target all --bundler builder
```

## Trigger new Release (with Github actions)

With github actions (`.github/workflows/main.yml`), when a new tag is created with format _`v*`_ :

- App is built on all platforms
- New release with tagname is created
- Windows & Linux apps are uploaded on this release

```bash
git tag -a v*.*.*
git push origin v*.*.*
```
