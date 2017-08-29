import Vue from 'vue/dist/vue.runtime.common.js'
import Vuex from 'vuex'
// import App from './app.vue'
import LandingPage from './landing-page.vue'

import {connect as connectToLogux} from './services/logux'
import {createStore} from './store'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

Vue.use(Vuex)
const store = createStore(Vuex)

const handleAction = (action) => {
  switch(action.type) {
    case 'LIST_ROOMS':
      store.commit('setRooms', action.rooms)
      break
  }
}

connectToLogux(WS_API_URL, API_URL).then(logux => {
  const userId = logux.options.userId

  logux.log.on('add', handleAction)
  logux.log.add({ type: 'logux/subscribe', name: `users/${userId}` }, {sync: true, reasons: ['subscribe']})
})

// Vue.component('landing-page', LandingPage)

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(LandingPage)
})
