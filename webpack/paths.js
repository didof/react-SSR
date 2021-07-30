const path = require('path')

const root = path.join(__dirname, '..')

const sIndex = path.join(root, 'server', 'index.js')
const sOutputPath = path.join(root, 'build')

const cIndex = path.join(root, 'client', 'index.js')
const cOutputPath = path.join(root, 'public')

const aIndex = path.join(root, 'api', 'index.js')
const aOutputPath = path.join(root, 'build')

const server = {
  index: sIndex,
  outputPath: sOutputPath,
}

const client = {
  index: cIndex,
  outputPath: cOutputPath,
}

const api = {
  index: aIndex,
  outputPath: aOutputPath,
}

module.exports = {
  root,
  server,
  client,
  api,
}
