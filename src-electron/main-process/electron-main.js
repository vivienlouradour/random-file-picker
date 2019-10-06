import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
const Store = require('electron-store')
import defaultSettings from '../../src/helpers/defaultAuthorizedExtensions'

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

const store = new Store()

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false // <-- add this
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function loadSettings () {
  let authorizedExtensions = store.get('authorizedExtensions')
  if (!authorizedExtensions) {
    store.set('authorizedExtensions', defaultSettings)
  }
  console.log('ElectronStore : ')
  console.log(store.get())
}
app.on('ready', () => {
  loadSettings()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('selectFolder', (event) => {
  let selectedPath = dialog.showOpenDialog({ properties: ['openDirectory', ''] })
  event.sender.send('selectedFolder', selectedPath)
})

let isExtensionAuthorized = extension => {
  let authorizedExtensions = store.get('authorizedExtensions')
  return !authorizedExtensions ||
    authorizedExtensions.length === 0 ||
    authorizedExtensions.includes(extension)
}

let listFiles = basePath => {
  let fileList = []
  let unauthorizedExtensions = []
  readdirSync(basePath).forEach(file => {
    let filePath = join(basePath, file)
    let isFile = statSync(filePath).isFile()

    if (isFile) {
      let extension = extname(filePath).substring(1)
      if (isExtensionAuthorized(extension)) {
        fileList = [...fileList, filePath]
      } else if (!unauthorizedExtensions.includes(extension)) {
        unauthorizedExtensions = [...unauthorizedExtensions, extension]
      }
    } else {
      let childs = listFiles(filePath)
      fileList = fileList.concat(childs.fileList)
      unauthorizedExtensions = unauthorizedExtensions.concat(childs.unauthorizedExtensions)
    }
  })
  return { fileList, unauthorizedExtensions }
}

ipcMain.on('listFiles', (event, directoryPath) => {
  let { fileList, unauthorizedExtensions } = listFiles(directoryPath)
  unauthorizedExtensions = [...new Set(unauthorizedExtensions)]
  event.sender.send('listedFiles', fileList, unauthorizedExtensions)
})
