import path from 'path'
import fs from 'fs'

const pagesDir = path.join(process.cwd(), 'src', 'client', 'pages')
const frameworkDir = path.join(process.cwd(), 'src', 'server', '.framework')

// TODO compose
const filenames = fs.readdirSync(pagesDir)
const mapped = mapFilenameToPage(filenames)

const routesConfig = generateRoutesConfig(mapped)
export default routesConfig

writeRoutesConfigJSON(filenames)

function mapFilenameToPage(filenames) {
  return filenames.map(function readPage(filename) {
    const page = require('../client/pages/' + filename)
    return { filename, component: page.default }
  })
}

function generateRoutesConfig(filenamePageMap) {
  return filenamePageMap.map(function genererateRouteConfig({
    filename,
    component,
  }) {
    return {
      path: applySlash(applyAliases(stripExt(filename))),
      component,
      exact: true,
    }
  })
}

function writeRoutesConfigJSON(filenames) {
  createDirIfNotExists(frameworkDir)
  const adapted = adaptRoutesConfigToJSON(filenames)
  fs.writeFileSync(
    path.join(frameworkDir, 'routes.config.json'),
    JSON.stringify(adapted)
  )
}

function createDirIfNotExists(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

function adaptRoutesConfigToJSON(filenames) {
  return filenames.map(function generateRouteConfigJSON(filename) {
    return {
      path: applySlash(applyAliases(stripExt(filename))),
      componentPath: filename,
    }
  })
}

/**
 *  utils
 */

function stripExt(filename) {
  const splitted = filename.split('.')
  splitted.pop()
  return splitted.join('')
}

function applyAliases(input) {
  switch (input) {
    case 'index':
      return ''
    default:
      return input
  }
}

function applySlash(input) {
  return '/' + input
}
