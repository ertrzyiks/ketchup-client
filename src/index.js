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

connectToLogux(WS_API_URL, API_URL).then(logux => {
  // store.commit('setRooms', [{name: 'Room #1'}, {name: 'Room #2'}])
})

// Vue.component('landing-page', LandingPage)

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(LandingPage)
})
