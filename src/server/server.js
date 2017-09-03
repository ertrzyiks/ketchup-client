import express from 'express'
import webpackMiddleware from 'webpack-dev-middleware'
import { createBundleRenderer } from 'vue-server-renderer'
import webpackClientConfig from '../../webpack.client.config'
import webpackServerConfig from '../../webpack.server.config'
import prepareBundle from './prepare_bundle'
import loadTemplate from './load_template'
import rendererMiddleware from './renderer_middleware'

const TEMPLATE_PATH = __dirname + '/index.template.html'

const app = express()

const clientBundle = prepareBundle(webpackClientConfig, 'vue-ssr-client-manifest.json')
const serverBundle = prepareBundle(webpackServerConfig, 'vue-ssr-server-bundle.json')

app.use(express.static('public'))
app.use(webpackMiddleware(clientBundle.compiler))
app.use(webpackMiddleware(serverBundle.compiler))

app.get('*', (req, res) => {

  Promise
    .all([loadTemplate(TEMPLATE_PATH), clientBundle.loadManifest(), serverBundle.loadManifest()])
    .then(([template, clientManifest, serverManifest]) => {
      const renderer = createBundleRenderer(serverManifest, {
        runInNewContext: false,
        template,
        clientManifest
      })

      rendererMiddleware(renderer)(req, res)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
