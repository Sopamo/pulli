import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import servers from './modules/servers'
import terminals from './modules/terminals'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {servers, terminals},
  strict: true
})
