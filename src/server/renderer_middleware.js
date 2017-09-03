export default (renderer) => {
  return (req, res) => {
    const context = { url: req.url }

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
  }
}
