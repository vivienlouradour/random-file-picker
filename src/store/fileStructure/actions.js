// Asynchronous
import { ipcRenderer } from 'electron'

export function selectDirectory (context, directoryPath) {
  console.log('selectDirectoryActionStart')
  let directoryName = 'TODO: directoryName'
  context.commit('selectDirectory', directoryPath, directoryName)

  context.commit('setLoading', true)
  ipcRenderer.send('listFiles', directoryPath)
  ipcRenderer.on('listedFiles', (event, files, unauthorizedExt) => {
    // this.files = files
    // this.unauthorizedExt = unauthorizedExt
    // this.isLoading = false
    context.commit('setDirectoryFiles', files)
    context.commit('setLoading', false)
    console.log('selectDirectoryActionFinished')
  })
}
