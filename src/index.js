import Vue from 'vue/dist/vue.runtime.common.js'
import Vuex from 'vuex'

import VueRouter from 'vue-router'

import App from './app.vue'
import LandingPage from './landing-page/landing-page.vue'
import Rooms from './rooms/rooms.vue'

import {connect as connectToLogux} from './services/logux'
import {createStore} from './store'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

Vue.use(Vuex)
Vue.use(VueRouter)

const store = createStore(Vuex)

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

Vue.component('landing-page', LandingPage)
Vue.component('rooms', Rooms)

const routes = [
    { path: '/rooms', name: 'rooms', component: Rooms },
    { path: '/', component: LandingPage },
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})

const app = new Vue({
    router,
    store,
    render: (x) => x(App),
    components: { LandingPage, Rooms }
}).$mount('#app')
