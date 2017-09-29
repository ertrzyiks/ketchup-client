import {connect as connectToLogux} from './services/logux'
import createApp from './create_app'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

const {app, store, router} = createApp()

const handleAction = (action) => {
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
}

connectToLogux(WS_API_URL, API_URL).then(logux => {
  const userId = logux.options.userId

  logux.log.on('add', handleAction)

  console.log('what is userid', userId)

  logux.log.add({ type: 'logux/subscribe', channel: `users/${userId}` }, {sync: true, reasons: ['subscribe']})

  store.commit('setLogux', logux)
})

router.onReady(() => {
  app.$mount('#app')
})
