// Asynchronous
import { ipcRenderer } from 'electron'
import { getName } from '../../helpers/fileHelper'
import { unlink } from 'fs'
import { Notify } from 'quasar'

export async function selectDirectory (context, directoryPath) {
  let directoryName = getName(directoryPath)
  context.commit('selectDirectory', { directoryPath, directoryName })

  context.commit('setLoading', true)
  ipcRenderer.send('listFiles', directoryPath)
  ipcRenderer.on('listedFiles', (event, files, unauthorizedExt) => {
    context.commit('setDirectoryFiles', { directoryFiles: files, unauthorizedExtensions: unauthorizedExt, test: 'lol' })
    context.commit('setLoading', false)
  })
}

export async function pickRandomFile (context) {
  let files = context.state.selectedDirectory.files
  let pickedFile = files[Math.floor(Math.random() * files.length)]
  let fileName = getName(pickedFile)
  context.commit('setSelectedFile', { filePath: pickedFile, fileName })
}

export async function deleteSelectedFile (context) {
  unlink(context.state.selectedFile.path, (error) => {
    if (error) {
      console.error(error)
      Notify.create({
        message: 'An error has occured',
        color: 'red'
      })
    } else {
      context.commit('deleteSelectedFile')
      Notify.create({
        message: 'File deleted',
        color: 'green'
      })
    }
  })
}
