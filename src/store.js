export function createStore(Vuex){
  return new Vuex.Store({
    state: {
      rooms_loading: true,
      rooms: [],
    },
    mutations: {
      setRooms (state, rooms) {
        state.rooms = rooms
      },

      addRoom (state, room) {
        state.rooms.push(room)
        state.rooms_loading = false
      }
    }
  })
}
