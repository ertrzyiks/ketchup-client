const webpack = require('webpack')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const base = require('./webpack.base.config')

const merge = require('webpack-merge')

module.exports = merge(base, {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
})
