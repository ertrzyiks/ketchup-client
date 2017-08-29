import Vue from 'vue/dist/vue.runtime.common.js'
import Vuex from 'vuex'

import VueRouter from 'vue-router'

import App from './app.vue'
import LandingPage from './landing-page.vue'
import Logux from './logux.vue'

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
      store.commit('setRooms', action.rooms)
      break
  }
}

connectToLogux(WS_API_URL, API_URL).then(logux => {
  const userId = logux.options.userId

  logux.log.on('add', handleAction)
  logux.log.add({ type: 'logux/subscribe', name: `users/${userId}` }, {sync: true, reasons: ['subscribe']})
})

Vue.component('landing-page', LandingPage)
Vue.component('logux', Logux)

const routes = [
    { path: '/logux', name: 'logux', component: Logux },
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
    components: { LandingPage, Logux }
}).$mount('#app')
