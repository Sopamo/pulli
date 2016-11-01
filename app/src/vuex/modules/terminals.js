import * as types from '../mutation-types'
import createPersist from 'vuex-localstorage'

const persist = createPersist('pulli-terminals', {
  terminals: {}
})

const state = persist.get()

const mutations = {
  [types.ADD_TERMINAL_LINE] (state, {line, serverId}) {
    if (typeof state.terminals[serverId] === 'undefined') {
      state.terminals[serverId] = {
        lines: []
      }
    }
    line.createdAt = Date.now()
    state.terminals[serverId].lines.push(line)
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
