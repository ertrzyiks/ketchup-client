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
        state.rooms = mapRooms(rooms)
      },

      addRoom (state, room) {
        console.log('add room')
        state.rooms.push(mapRoom(room, state.logux.options.userId))

        console.log('state rooms: ', state.rooms)
        state.rooms_loading = false
      },

      removeRoom (state, room) {
        console.log('remove room')
        // const roomNameToRemove = state.rooms.find(r => r.name !== room.name))
        // console.log('updated rooms', updatedRooms)
        // state.rooms = updatedRooms

        for (let i = 0; i < state.rooms.length; i++) {
          if (state.rooms[i].name === room.name) {
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
  const isOwner = room.creatorId === currentUserId
  return Object.assign({}, room, { isOwner })
}

function mapRooms(rooms) {
  return rooms.map(mapRoom)
}
