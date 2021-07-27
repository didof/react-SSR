const paths = require('./paths')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const webpackNodeExternals = require('webpack-node-externals')

const serverConfig = {
  target: 'node',

  entry: paths.server.index,

  output: {
    filename: 'bundle.server.js',
    path: paths.server.outputPath,
  },

  externals: [webpackNodeExternals()],
}

module.exports = merge(commonConfig, serverConfig)
