const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, 'src')

const sIndex = path.join(src, 'server', 'index.js')
const sOutputPath = path.join(root, 'build')

const cIndex = path.join(src, 'client', 'index.js')
const cOutputPath = path.join(root, 'public')

const server = {
  index: sIndex,
  outputPath: sOutputPath,
}

const client = {
  index: cIndex,
  outputPath: cOutputPath,
}

module.exports = {
  root,
  server,
  client,
}
