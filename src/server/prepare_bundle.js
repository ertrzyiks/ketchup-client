import webpack from 'webpack'

const loadManifest = (compiler, assetName) => {
  let promise, resolve

  compiler.plugin('compile', () => {
    promise = new Promise(_resolve => {
      resolve = _resolve
    })
  })

  compiler.plugin('emit', (compilation, callback) => {
    const manifest = compilation.assets[assetName].source()
    resolve(JSON.parse(manifest))
    callback()
  })

  return () => promise
}

export default (config, assetName) => {
  const compiler = webpack(config)

  return {
    compiler,
    loadManifest: loadManifest(compiler, assetName),
  }
}




