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
        state.rooms.splice(0, state.rooms.length)
        state.rooms.push(...mappedRooms)

        console.log('mapped rooms', mappedRooms)
        console.log('state.rooms updated - set rooms', state.rooms)
      },

      addRoom (state, room) {
        console.log('store: add room', room)
        state.rooms.push(mapRoom(room, state.logux.options.userId))

        state.rooms_loading = false
      },

      updateRoomDetails (state, {room, actionId}) {
        console.log('room for updating', room)
        console.log('action id', actionId)

        let roomToUpdate = state.rooms.find(r => arraysEqual(r.actionId, actionId))
        if (!roomToUpdate) {
          console.log('There is no room with action id:', actionId)
          return
        }

        console.log('room current', roomToUpdate)

        Object.assign(roomToUpdate, mapRoom(room, state.logux.options.userId), { isPending: false, actionId: undefined })
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

function arraysEqual(array1, array2) {
  array1 = Array.isArray(array1) ? array1 : [];
  array2 = Array.isArray(array2) ? array2 : [];
  return array1.length === array2.length && array1.every((el, ndx) => el === array2[ndx]);
}
