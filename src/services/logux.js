import CrossTabClient from 'logux-client/cross-tab-client'
import {retrieveUserSession, refreshUserSession} from './auth/index'

export function connect(wsApiUrl, apiUrl) {
  const retrieveAndConnect = () => retrieveUserSession(apiUrl).then(user => createConnection(wsApiUrl, user))
  const refreshRetrieveAndConnect = () => refreshUserSession(apiUrl).then(() => retrieveAndConnect())

  return retrieveAndConnect()
    .catch(() => refreshRetrieveAndConnect())
    .catch(err => {
      console.error('ERR', err)
    })
}

export function createConnection(wsApiUrl, user) {
  return new Promise((resolve, reject) => {
    const logux = new CrossTabClient({
      credentials: user.access_token,
      subprotocol: '1.0.0',
      userId: user.id,
      server: wsApiUrl
    })

    logux.sync.on('connect', () => {
      resolve(logux)
    })

    logux.sync.on('error', err => {
      if (err.type === 'wrong-credentials') {
        logux.sync.throwsError = false
        logux.destroy()
        reject(err)
      }
    })

    logux.start()
  })
}
