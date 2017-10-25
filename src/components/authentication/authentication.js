import {get} from '../../services/connect_to_logux'

const API_URL = process.env.API_URL

module.exports = {
  name: 'authentication',

  beforeMount: function () {
    get({apiUrl: API_URL}).then(user => this.$connectToLogux(user))

    // .then(logux => {
    //   const userId = logux.options.userId
    //   logux.log.add({ type: 'logux/subscribe', channel: `users/${userId}` }, {sync: true})
    // })
  }
}
