import Vue from 'vue/dist/vue.runtime.common.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import createStore from './create_store'
import App from './app.vue'
import LandingPage from './landing-page/landing-page.vue'
import Rooms from './rooms/rooms.vue'

export default () => {
  Vue.use(Vuex)
  Vue.use(VueRouter)

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

  const store = createStore(Vuex)

  const app = new Vue({
    router,
    store,
    render: (x) => x(App),
    components: { LandingPage, Rooms }
  })

  return {
    app,
    store,
    router
  }
}


