import path from 'path'
import fs from 'fs'
import { existsAndIsFunction } from './helpers/check'
import App from '../client/_app'

const pagesDir = path.join(process.cwd(), 'client', 'pages')
const frameworkDir = path.join(process.cwd(), '.framework')

// TODO compose
const filenames = fs.readdirSync(pagesDir)
const mapped = mapFilenameToPage(filenames)

const routesConfig = generateRoutesConfig(mapped)
export default routesConfig

writeRoutesConfigJSON(mapped)

function mapFilenameToPage(filenames) {
  return filenames.map(function readPage(filename) {
    const page = require('../client/pages/' + filename)
    return { filename, component: page.default }
  })
}

function generateRoutesConfig(filenamePageMap) {
  const pagesRoutes = filenamePageMap.map(function genererateRouteConfig({
    filename,
    component,
  }) {
    return {
      path: applySlash(applyAliases(stripExt(filename))),
      component,
      exact: true,
    }
  })

  return [
    {
      component: App,
      routes: pagesRoutes,
    },
  ]
}

function writeRoutesConfigJSON(mapped) {
  createDirIfNotExists(frameworkDir)
  const adapted = adaptRoutesConfigToJSON(mapped)

  fs.writeFileSync(
    path.join(frameworkDir, 'routes.config.json'),
    JSON.stringify(adapted)
  )
}

function createDirIfNotExists(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

function adaptRoutesConfigToJSON(filenames) {
  return filenames.map(function generateRouteConfigJSON({
    filename,
    component,
  }) {
    const checkPrepopulate = existsAndIsFunction('prepopulate')

    return {
      path: applySlash(applyAliases(stripExt(filename))),
      componentPath: filename,
      hasPrepopulate: checkPrepopulate(component),
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
