import {connect as connectToLogux} from './services/logux'
import createApp from './create_app'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

const {app, store, router} = createApp()

const handleAction = (action) => {
  switch(action.type) {
    case 'LIST_ROOMS':
      console.log('handling action')
      store.commit('setRooms', action.rooms)
      break;
    case 'CREATED_ROOM_DETAILS':
      store.commit('addRoom', action.room)
      break
    case 'REMOVE_ROOM_DETAILS':
      // change to id
      store.commit('removeRoom', action.room)
  }
}

connectToLogux(WS_API_URL, API_URL).then(logux => {
  const userId = logux.options.userId

  logux.log.on('add', handleAction)
  logux.log.add({ type: 'logux/subscribe', name: `users/${userId}` }, {sync: true, reasons: ['subscribe']})

  store.commit('setLogux', logux)
  // testing
  // setTimeout(() => {
  //   console.log('setting rooms')
  //   logux.log.add({ type: 'LIST_ROOMS', rooms: [ { name: 'room3' }, { name: 'room4' }, { name: 'room5' } ], reasons: ['list rooms'] })
  // }, 1000)

})

router.onReady(() => {
  app.$mount('#app')
})
