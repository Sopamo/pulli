import * as types from '../mutation-types'
import createPersist from 'vuex-localstorage'

const persist = createPersist('pulli-servers', {
  servers: []
})

const state = persist.get()

const mutations = {
  [types.SAVE_SERVER] (state, server) {
    let oldServer = state.servers.find(s => s.id === server.id)
    if (!oldServer) {
      state.servers.push(server)
    } else {
      for (let entry in server) {
        if (server.hasOwnProperty(entry)) {
          oldServer[entry] = server[entry]
        }
      }
    }
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
