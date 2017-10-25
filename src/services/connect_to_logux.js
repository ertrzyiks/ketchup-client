import CrossTabClient from 'logux-client/cross-tab-client'
import {getLocalUserSession, refreshUserSession, retrieveUserSession} from './auth/index'

function createLogux(wsApiUrl, user) {
  return new CrossTabClient({
    credentials: user.access_token || '',
    subprotocol: '1.0.0',
    userId: user.id || '',
    server: wsApiUrl
  })
}

export function connect ({wsApiUrl, apiUrl}) {
  return Promise.resolve(getLocalUserSession())
    .then(user => {
      if (user === false) {
        return retrieveUserSession(apiUrl)
      }

      return user
    })
    .then(userData => {
      return connectToLogux({
        userData,
        wsApiUrl,
        apiUrl
      })
    })
}

export function connectToLogux ({userData, wsApiUrl, apiUrl}) {
  const logux = createLogux(wsApiUrl, userData)

  logux.sync.on('connect', () => {
    const userId = logux.options.userId
    logux.log.add({ type: 'logux/subscribe', channel: `users/${userId}` }, {sync: true})
  })

  logux.sync.on('error', err => {
    if (err.type === 'wrong-credentials') {
      refreshUserSession(apiUrl).then(user => {
        logux.sync.options.credentials = user.access_token
        logux.sync.connection.connect()
      })
    }
  })

  return logux
}
