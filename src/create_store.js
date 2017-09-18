export default Vuex => {
  return new Vuex.Store({
    state: {
      rooms_loading: true,
      rooms: [],
      logux: null
    },
    mutations: {
      setRooms (state, rooms) {
        console.log('rooms', rooms)
        const mappedRooms = mapRooms(rooms, state.logux.options.userId)
        state.rooms.push(...mappedRooms)

        console.log('mapped rooms', mappedRooms)
        console.log('state.rooms updated - set rooms', state.rooms)
      },

      addRoom (state, room) {
        console.log('add room')
        state.rooms.push(mapRoom(room, state.logux.options.userId))

        console.log('room.state updated on add')

        console.log('state rooms: ', state.rooms)
        state.rooms_loading = false
      },

      removeRoom (state, roomId) {
        console.log('remove room', roomId)

        for (let i = 0; i < state.rooms.length; i++) {
          if (state.rooms[i].id === roomId) {
            state.rooms.splice(i, 1);
            break;
          }
        }
      },

      setLogux (state, logux) {
        console.log('setting logux')
        state.logux = logux
      }
    }
  })
}

function mapRoom(room, currentUserId) {
  const isOwner = room.owner_id === currentUserId
  return Object.assign({}, room, { isOwner })
}

function mapRooms(rooms, currentUserId) {
  return rooms.map(r => mapRoom(r, currentUserId))
}
