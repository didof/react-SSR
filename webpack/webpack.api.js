const paths = require('./paths')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const webpackNodeExternals = require('webpack-node-externals')

const apiConfig = {
  target: 'node',

  entry: paths.api.index,

  output: {
    filename: 'bundle.api.js',
    path: paths.api.outputPath,
  },

  externals: [webpackNodeExternals()],
}

module.exports = merge(commonConfig, apiConfig)
