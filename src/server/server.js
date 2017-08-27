const express = require('express')
const path = require('path')
const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')

const app = express()

app.use(express.static('public'))

app.use(webpackMiddleware(webpack(webpackConfig)))

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/../index.html'))
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
