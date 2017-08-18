import CrossTabClient from 'logux-client/cross-tab-client'
import Vue from 'vue/dist/vue.runtime.common.js'
import LandingPage from './landing-page.vue'

// const user = document.querySelector('meta[name=user]')
// const token = document.querySelector('meta[name=token]')
// const server = document.querySelector('meta[name=server]')
//
// const logux = new CrossTabClient({
//   credentials: token.content,
//   subprotocol: '1.0.0',
//   userId: user.content,
//   url: server.content
// })
// logux.start()
//
// const submit = document.getElementById('the-button')
//
// submit.addEventListener('click', () => {
//   logux.log.add({
//     type: 'CLICK'
//   })
// }, false)
//
// logux.on('add', (action, meta) => {
//   if (action.type === 'CLICK') {
//     var li = document.createElement('li')
//     li.innerHTML = 'CLICK'
//     document.getElementById('content').appendChild(li)
//   }
// })

new Vue({
    el: '#app',
    render: (h) => h(LandingPage)
})
