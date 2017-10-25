import Vue from 'vue/dist/vue.runtime.common.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import createStore from './create_store'
import App from './components/app.vue'
import LandingPage from './components/landing-page/landing-page.vue'
import Rooms from './components/rooms/rooms.vue'
import Authentication from './components/authentication/authentication.vue'

const createLoguxPlugin = (handleActions) => {
  return store => {
    store.subscribe((mutation, state) => {
      if (mutation.type !== 'setLogux') {
        return
      }

      const {logux} = state

      logux.log.on('add', (action) => handleActions({action, store}))

      logux.sync.on('state', function () {
        store.commit('connected', logux.sync.connected)
      })

      logux.sync.on('connect', () => {
        store.commit('authenticate')
      })
    })
  }
}

const loguxPlugin = createLoguxPlugin(({action, store}) => {
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

export default () => {
  Vue.use(Vuex)
  Vue.use(VueRouter)

  Vue.component('landing-page', LandingPage)
  Vue.component('rooms', Rooms)
  Vue.component('authentication', Authentication)

  const routes = [
    { path: '/rooms', name: 'rooms', component: Rooms },
    { path: '/', component: LandingPage },
  ]

  const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
  })

  const store = createStore(Vuex, [loguxPlugin])

  const app = new Vue({
    router,
    store,
    render: (x) => x(App),
    components: { LandingPage, Rooms, Authentication }
  })

  return {
    app,
    store,
    router
  }
}


