const paths = require('./paths')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const clientConfig = {
  entry: paths.client.index,

  output: {
    filename: 'bundle.client.js',
    path: paths.client.outputPath,
  },
}

module.exports = merge(commonConfig, clientConfig)
