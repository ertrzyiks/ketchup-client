import Vue from 'vue/dist/vue.runtime.common.js'
// import App from './app.vue'
import LandingPage from './landing-page.vue'

// Vue.component('landing-page', LandingPage)

new Vue({
    el: '#app',
    render: (h) => h(LandingPage)
})
