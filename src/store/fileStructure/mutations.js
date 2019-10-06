// Synchronous
export const selectDirectory = (state, { directoryPath, directoryName }) => {
  state.selectedDirectory.path = directoryPath
  state.selectedDirectory.name = directoryName
  state.selectedDirectory.isSelected = true
  state.selectedDirectory.files.length = 0 // empty files array

  state.selectedFile.isSelected = false
  state.selectedFile.path = null
  state.selectedFile.name = null
  state.nbPicked = 0
}

export const setDirectoryFiles = (state, { directoryFiles, unauthorizedExtensions, lol }) => {
  state.selectedDirectory.files = directoryFiles
  state.selectedDirectory.unauthorizedExtensions = unauthorizedExtensions
}

export const setLoading = (state, isLoading) => {
  state.isLoading = isLoading
}

export const setSelectedFile = (state, { filePath, fileName }) => {
  state.selectedFile.path = filePath
  state.selectedFile.name = fileName
  state.selectedFile.isSelected = true
  let index = state.selectedDirectory.files.indexOf(filePath)
  state.selectedDirectory.files.splice(index, 1)
  state.nbPicked++
}
