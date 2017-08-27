import Vue from 'vue/dist/vue.runtime.common.js'
// import App from './app.vue'
import LandingPage from './landing-page.vue'

import {retrieveUserSession} from './services/auth'

// Vue.component('landing-page', LandingPage)


retrieveUserSession().then(user => {
    console.log('Logged in as', user.name)
})

new Vue({
    el: '#app',
    render: (h) => h(LandingPage)
})
