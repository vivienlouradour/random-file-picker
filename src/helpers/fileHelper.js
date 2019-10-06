import { basename, dirname } from 'path'

function getName (path) {
  return basename(path)
}

function getParentDirectory (filePath) {
  return dirname(filePath)
}

export { getName, getParentDirectory }
