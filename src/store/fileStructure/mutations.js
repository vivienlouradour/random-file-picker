// Synchronous
export const selectDirectory = (state, directoryPath, directoryName) => {
  state.selectedDirectory.path = directoryPath
  state.selectedDirectory.name = directoryName
  state.selectedDirectory.isSelected = true
  console.log('hello2')
}

export const setDirectoryFiles = (state, directoryFiles) => {
  state.selectDirectory.files = directoryFiles
}

export const setLoading = (state, isLoading) => {
  state.isLoading = isLoading
}
