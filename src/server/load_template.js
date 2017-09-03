export default path => {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, 'utf-8', (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data.toString())
    })
  })
}
