import CrossTabClient from 'logux-client/cross-tab-client'

export function connect(wsApiUrl, user) {
  return new Promise((resolve, reject) => {
    const logux = new CrossTabClient({
      credentials: user.access_token,
      subprotocol: '1.0.0',
      userId: user.name,
      server: wsApiUrl
    })

    logux.sync.on('connect', () => {
      resolve(logux)
    })

    logux.sync.on('error', (err) => {
      if (err.type === 'wrong-credentials') {
        logux.destroy()
        reject(err)
      }
    })

    logux.start()
  })
}
