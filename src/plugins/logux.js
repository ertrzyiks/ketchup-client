import {createConnection} from '../services/connect_to_logux'

const VueLogux = {
  install: (Vue, {store, wsApiUrl}) => {
    store.registerModule('logux', {
      state () {
        return {
          connected: false,
          authenticated: false
        }
      },
      mutations: {
        'logux:connected' (state, connected) {
          state.connected = connected
        },

        'logux:authenticate' (state, authenticated) {
          state.authenticated = authenticated
        },

        'logux:setClient' (state, client) {
          state.client = client
        }
      },
      dispatch: {
        'logux:authenticate' (context) {
          context.commit('logux:authenticate', true)
        },
        'logux:action' (context, action) {
          throw new Error('Implement "logux:action" store action')
        }
      }
    })

    Vue.prototype.$connectToLogux = function ({userId, crendentials}) {
      const logux = createConnection(wsApiUrl, {userId, crendentials})

      store.commit('logux:setClient', logux)

      logux.log.on('add', (action) => store.dispatch('logux:action', action))

      logux.sync.on('state', function () {
        store.commit('logux:connected', logux.sync.connected)
      })

      logux.sync.on('connect', () => {
        store.dispatch('logux:authenticate')
      })

      logux.start()
    }
  }
}

export default VueLogux
