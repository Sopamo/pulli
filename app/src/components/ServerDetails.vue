<style lang="scss">
  .details-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .tasks-list {
    flex: 1;
    overflow-y: scroll;
  }
</style>

<template>
<div class="title-bar-wrapper">
  <div class="title-bar">
    <h1>
      <span @click="selfTest">
        <state-indicator :server="server"></state-indicator>
        {{ server.name }}
        <span class="subtitle">{{ server.username }}@{{ server.ip }}</span>
      </span>
      <button class="btn btn-default" @click="addTask">
        <span class="icon icon-plus icon-text"></span>
        Neuer Task
      </button>
    </h1>
  </div>
  <div class="details-wrapper">
    <div class="tasks-list">
      <task-line :task="task" v-for="task in serverTasks"></task-line>
    </div>
    <terminal :server="server"></terminal>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../vuex/mutation-types'
  import StateIndicator from './partials/StateIndicator'
  import TaskLine from './partials/TaskLine'
  import Task from '../models/Task'
  import Terminal from './partials/Terminal'

  export default {
    computed: {
      ...mapGetters([
        'servers',
        'tasks'
      ]),
      server() {
        return this.servers[this.$route.params.index]
      },
      serverTasks() {
        let tasks = this.tasks[this.server.id]
        if (typeof tasks === 'undefined' || !tasks) {
          return []
        }
        return tasks.map(task => new Task(task))
      }
    },
    methods: {
      ...mapMutations({
        commitAddTask: types.ADD_TASK
      }),
      selfTest() {
        this.server.selfTest()
      },
      addTask() {
        this.commitAddTask({
          name: null,
          serverId: this.server.id
        })
      }
    },
    components: {
      StateIndicator,
      Terminal,
      TaskLine
    }
  }
</script>
