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
        this.$store.state.logux.log.add({ type: 'CREATE_ROOM', room: {name: randomName} }, { sync: true, reasons: ['createRoom']})

        console.log('request sent')
      } 
    },

    removeUserFromRoom: function(room) {
      this.errorMessage = ''
      console.log('removing user from room:', room.id)

      room.isOwner
        ? this.$store.state.logux.log.add({ type: 'DELETE_ROOM', roomId: room.id }, { sync: true, reasons: ['deleteRoom']})
        : this.$store.state.logux.log.add({ type: 'REMOVE_FROM_ROOM', roomId: room.id }, { sync: true, reasons: ['removeFromRoom']})
    }
  }
}
