import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

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

app.on('ready', createWindow)

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

let listFiles = (basePath, rec = true) => {
  // Get file structure
  let fileTree = []
  let fileList = []
  readdirSync(basePath).forEach(file => {
    let filePath = join(basePath, file)
    let isFile = statSync(filePath).isFile()

    let fileElement = {
      name: file,
      path: filePath,
      isFile: isFile
    }
    if (isFile) {
      fileList = [...fileList, filePath]
    } else {
      let { fileTreeChilds, fileListChilds } = listFiles(filePath)
      fileElement = { ...fileElement, files: fileTreeChilds }
      fileList = [...fileList, fileListChilds]
    }

    fileTree = [...fileTree, fileElement]
  })

  // return fileTree
  return { fileList, fileTree }
}

ipcMain.on('listFiles', (event, directoryPath) => {
  // const getDirectories = basePath =>
  //   readdirSync(basePath, { withFileTypes: true })
  //     .filter(dirent => dirent.isFile())
  //     .map(dirent => path.join(basePath, dirent))
  event.sender.send('listedFiles', listFiles(directoryPath).fileList)// getDirectories(directoryPath))
})
