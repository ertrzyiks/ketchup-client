import {connect} from '../../services/connect_to_logux'

const WS_API_URL = process.env.WS_API_URL
const API_URL = process.env.API_URL

module.exports = {
  name: 'authentication',

  beforeMount: function () {
    connect({
      wsApiUrl: WS_API_URL,
      apiUrl: API_URL,
      store: this.$store
    })
  }
}
