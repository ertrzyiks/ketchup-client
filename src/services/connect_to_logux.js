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

export function connect ({wsApiUrl, apiUrl, store}) {
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
        apiUrl,
        store
      })
    })
}

export function connectToLogux ({userData, wsApiUrl, apiUrl, store}) {
  const logux = createLogux(wsApiUrl, userData)
  store.commit('setLogux', logux)

  logux.sync.on('state', function () {
    store.commit('connected', logux.sync.connected)
  })

  logux.sync.on('connect', () => {
    store.commit('authenticate')

    const userId = logux.options.userId
    logux.log.add({ type: 'logux/subscribe', channel: `users/${userId}` }, {sync: true})
  })

  logux.log.on('add', (action) => {

    console.log('ACTION', action)

    switch(action.type) {
      case 'LIST_ROOMS':
        console.log('handling action list rooms', action.rooms)
        store.commit('setRooms', action.rooms)
        break;
      case 'CREATED_ROOM_DETAILS':
        console.log('createdRoomDetails', action)

        store.commit('updateRoomDetails', {room: action.room, actionId: action.originalActionId})
        break
      case 'REMOVE_ROOM_DETAILS':
        console.log('remove room action client')
        store.commit('removeRoom', action.roomId)
        break
      case 'logux/undo':
        console.log('received logux/undo action for:', action.id)
        break;
    }
  })

  logux.sync.on('error', err => {
    if (err.type === 'wrong-credentials') {
      refreshUserSession(apiUrl).then(user => {
        logux.sync.options.credentials = user.access_token
        logux.sync.connection.connect()
      })
    }
  })

  logux.start()

  return logux
}
