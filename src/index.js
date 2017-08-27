import Vue from 'vue/dist/vue.runtime.common.js'
// import App from './app.vue'
import LandingPage from './landing-page.vue'

import {retrieveUserSession, refreshUserSession} from './services/auth/index'
import {connect} from './services/logux'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

const retrieveAndConnect = () => retrieveUserSession(API_URL).then(user => connect(WS_API_URL, user))
const refreshRetrieveAndConnect = () => refreshUserSession(API_URL).then(() => retrieveAndConnect())

retrieveAndConnect()
  .catch(() => refreshRetrieveAndConnect())
  .then(logux => {
      console.log('CONNECTED!!')
  })
  .catch(err => {
      console.log('ERR', err)
  })

// Vue.component('landing-page', LandingPage)

new Vue({
  el: '#app',
  render: (h) => h(LandingPage)
})
