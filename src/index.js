import createApp from './create_app'

const {app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})
