module.exports = {
  name: 'rooms',
  data () {
    var that = this
    return {
      rooms: this.$store.state.rooms,
      errorMessage: '',
    }
  },
  computed: {
    connected () {
      if (!this.$store.state.logux) {
        return false
      }

      return this.$store.state.logux.sync.connected
    }
  },
  methods: {
    createRoom: function() {
      this.errorMessage = ''

      const roomsCount = this.$store.state.rooms.length
      if (roomsCount > 4) {
        this.errorMessage = 'You have too many rooms - delete or leave some to create new ones'
        return
      }

      // TODO: some more evaluation of existing names
      const roomName = `My room #${roomsCount + 1}`

      console.log('creating room')
      if (this.$store.state.logux) {
        const createAction = this.$store.state.logux.log.add({ type: 'CREATE_ROOM', room: {name: roomName} }, { sync: true, reasons: ['createRoom']})
          .then(meta => {
            console.log('create meta', meta)
            console.log('create action id', meta.id.slice())
            // debugger
            console.log('adding room to store')
            this.$store.commit('addRoom', { name: roomName, /* owner_id: , */ actionId: meta.id.slice(), isPending: true })

            console.log('request sent')
          })
      }
    },

    removeUserFromRoom: function(room) {
      this.errorMessage = ''
      console.log('removing user from room:', room.id)

      console.log('is owner:', room.isOwner)

      room.isOwner
        ? this.$store.state.logux.log.add({ type: 'DELETE_ROOM', roomId: room.id }, { sync: true, reasons: ['deleteRoom']})
        : this.$store.state.logux.log.add({ type: 'REMOVE_FROM_ROOM', roomId: room.id }, { sync: true, reasons: ['removeFromRoom']})
    }
  }
}
