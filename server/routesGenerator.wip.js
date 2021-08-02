import p from 'path'
import fs from 'fs'

import { existsAndIsFunction } from './helpers/check'

const pagesDir = p.resolve(process.cwd(), 'client', 'pages')
const frameworkDir = p.join(process.cwd(), '.framework')

function generateRoutesConfig() {
  let rawRouterConfig = []

  digDir(pagesDir, '')

  return rawRouterConfig

  function digDir(dirPath, prefix) {
    const contentsPaths = retrieveAbsolutePathOfContents(dirPath, prefix)

    const [filesPaths, dirsPaths] = groupFilesAndDirs(contentsPaths)

    const rawEntry = filesPaths.map(filePath => {
      let filename = filePath.substr(filePath.indexOf('/pages') + 6)

      const component = require('../client/pages' + filename).default

      filename = filename.slice(0, -3)

      return {
        path: filename,
        exact: true,
        component,
      }
    })

    rawRouterConfig = [...rawRouterConfig, ...rawEntry]

    if (dirsPaths.length > 0)
      dirsPaths.forEach(dirPath => {
        const prefix = dirPath.substr(dirPath.indexOf('/pages') + 7)

        digDir(dirPath, prefix)
      })

    return rawRouterConfig
  }

  function retrieveAbsolutePathOfContents(dirPath, prefix) {
    return fs.readdirSync(dirPath).map(retrieveAbsolutePath)

    function retrieveAbsolutePath(content) {
      return p.resolve(pagesDir, prefix, content)
    }
  }

  function groupFilesAndDirs(filesPaths) {
    return filesPaths.reduce(
      (separated, currentPath) => {
        const stat = fs.lstatSync(currentPath)
        if (stat.isFile()) separated[0].push(currentPath)
        if (stat.isDirectory()) separated[1].push(currentPath)

        return separated
      },
      [[], []]
    )
  }
}

const routesConfig = generateRoutesConfig()
export default routesConfig

writeRoutesConfigJSON(routesConfig)

function writeRoutesConfigJSON(mapped) {
  createDirIfNotExists(frameworkDir)
  const adapted = adaptRoutesConfigToJSON(mapped)
  fs.writeFileSync(
    p.join(frameworkDir, 'routes.config.json'),
    JSON.stringify(adapted)
  )

  function createDirIfNotExists(path) {
    if (!fs.existsSync(path)) fs.mkdirSync(path)
  }

  function adaptRoutesConfigToJSON(filenames) {
    return filenames.map(function generateRouteConfigJSON({ path, component }) {
      const checkPrepopulate = existsAndIsFunction('prepopulate')

      return {
        path: path.includes('index') ? '/' : path,
        componentPath: path.substring(1) + '.js',
        hasPrepopulate: checkPrepopulate(component),
      }
    })
  }
}
