module.exports = {
  name: 'rooms',
  data () {
    var that = this
    return {
      rooms: this.$store.state.rooms,
      errorMessage: ''
    }
  },
  methods: {
    createRoom: function() {
      this.errorMessage = ''

      if (this.$store.state.rooms.length > 4) {
        this.errorMessage = 'You have too many rooms - delete or leave some to create new ones'
        return
      }

      const randomName = `temp-${Math.random() * 100}`
      console.log('creating room', this.$store.state.logux)
      if (this.$store.state.logux) {
        this.$store.state.logux.log.add({ type: 'CREATE_ROOM', room: {name: randomName} }, { sync: false, reasons: ['createRoom']})

        console.log('request sent')

        // manual response from logux
        setTimeout(() => {
          console.log('response received')
          this.$store.state.logux.log.add({ type: 'CREATED_ROOM_DETAILS', room: {name: randomName, creatorId: this.$store.state.logux.options.userId } }, { sync: false, reasons: ['createRoomResponse']})
        }, 300)
      } 
    },

    removeUserFromRoom: function(room) {
      this.errorMessage = ''
      console.log('removing user from room', room)

      // TODO: sth on the logux side should know what to do with the request
      room.isOwner
        // change to id
        ? this.$store.state.logux.log.add({ type: 'DELETE_ROOM', roomName: room.name }, { sync: false, reasons: ['deleteRoom']})
        : this.$store.state.logux.log.add({ type: 'REMOVE_FROM_ROOM', roomName: room.name }, { sync: false, reasons: ['removeFromRoom']})

      // manual response from logux
      setTimeout(() => {
        console.log('response from delete')
        this.$store.state.logux.log.add({ type: 'REMOVE_ROOM_DETAILS', room: {name: room.name}}, { sync: false, reasons: ['deleteResponse']})
      }, 300)
    }
  }
}