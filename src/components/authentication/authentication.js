import {connect} from '../../services/connect_to_logux'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

module.exports = {
  name: 'authentication',

  beforeMount: function () {
    connect({
      wsApiUrl: WS_API_URL,
      apiUrl: API_URL
    }).then(logux => {
      logux.start()
      this.$store.commit('setLogux', logux)

      const userId = logux.options.userId
      logux.log.add({ type: 'logux/subscribe', channel: `users/${userId}` }, {sync: true})
    })
  }
}
