import express from 'express'
import webpackMiddleware from 'webpack-dev-middleware'
import { createBundleRenderer } from 'vue-server-renderer'
import webpackClientConfig from '../../webpack.client.config'
import webpackServerConfig from '../../webpack.server.config'
import prepareBundle from './prepare_bundle'
import loadTemplate from './load_template'

const TEMPLATE_PATH = __dirname + '/../index.template.html'

const app = express()

const clientBundle = prepareBundle(webpackClientConfig, 'vue-ssr-client-manifest.json')
const serverBundle = prepareBundle(webpackServerConfig, 'vue-ssr-server-bundle.json')

app.use(express.static('public'))
app.use(webpackMiddleware(clientBundle.compiler))
app.use(webpackMiddleware(serverBundle.compiler))

app.get('*', (req, res) => {
  const context = { url: req.url }

  Promise
    .all([loadTemplate(TEMPLATE_PATH), clientBundle.loadManifest(), serverBundle.loadManifest()])
    .then(([template, clientManifest, serverManifest]) => {
      const renderer = createBundleRenderer(serverManifest, {
        runInNewContext: false,
        template,
        clientManifest
      })

      renderer.renderToString(context, (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found')
          } else {
            console.error(err)
            res.status(500).end('Internal Server Error')
          }
        } else {
          res.end(html)
        }
      })
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
