import * as types from '../mutation-types'
import createPersist from 'vuex-localstorage'
import uuid from 'uuid'

const persist = createPersist('pulli-tasks', {
  tasks: {}
})

const state = persist.get()

const mutations = {
  [types.ADD_TASK] (state, {name, serverId}) {
    if (typeof state.tasks[serverId] === 'undefined') {
      state.tasks[serverId] = []
    }
    let task = {}
    task.id = uuid.v4()
    task.serverId = serverId
    task.createdAt = Date.now()
    task.name = name
    task.commands = null
    state.tasks[serverId].unshift(task)
    persist.set(state)
  },
  [types.SET_TASK_NAME] (state, {task, name}) {
    let stateTask = state.tasks[task.serverId].find(t => t.id === task.id)
    stateTask.name = name
    persist.set(state)
  },
  [types.UPDATE_TASK_COMMANDS] (state, {task, commands}) {
    let stateTask = state.tasks[task.serverId].find(t => t.id === task.id)
    stateTask.commands = commands
    persist.set(state)
  }
}

export default {
  state,
  mutations
}
