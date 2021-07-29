import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const readdirPromise = promisify(fs.readdir)
// const readFilePromise = promisify(fs.readFile)

const pagesDir = path.join(process.cwd(), 'src', 'client', 'pages')

function routesGenerator() {
  collectFilenames(pagesDir).then(mapFilenameToPage).then(todo)
}

export default routesGenerator

function collectFilenames(path) {
  return readdirPromise(path).catch(function unableToReadDir(err) {
    console.error(`Unable to read pages directory at ${pagesDir}`)
    throw new Error(err)
  })
}

function mapFilenameToPage(filenames) {
  return filenames.map(function readPage(filename) {
    const page = require('../client/pages/' + filename)
    return { filename, component: page.default }
  })
}

function todo(filenamePageMap) {
  return filenamePageMap.map(function stocazzo({ filename, component }) {
    console.log(component)

    return {
      path: filename,
    }
  })
}

/**
 * {
    loadData: () => {},
    path: '/',
    component: Index,
    exact: true,
  }
 */
