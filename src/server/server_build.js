import fs from 'fs'
import express from 'express'
import { createBundleRenderer } from 'vue-server-renderer'
import rendererMiddleware from './renderer_middleware'
import clientManifest from '../../dist/vue-ssr-client-manifest.json'
import serverManifest from '../../dist/vue-ssr-server-bundle.json'

const TEMPLATE_PATH = __dirname + '/index.template.html'
const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8')

const renderer = createBundleRenderer(serverManifest, {
  runInNewContext: false,
  template,
  clientManifest
})

const app = express()

app.use(express.static('public'))
app.get('*', rendererMiddleware(renderer))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
