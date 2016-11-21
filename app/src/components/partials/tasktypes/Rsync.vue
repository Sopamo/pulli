<style lang="scss">
  .taskpart {
    overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    &--header {
      background: #f0f0f0;
      padding: 10px;
      color: #333;
      font-size: 16px;
      border-bottom: 2px solid #040d10;
    }

    &--item {
      background: #0E323C;
      display: flex;
      color: white;
      border-bottom: 1px solid #040d10;

      &-description {
        padding: 10px;
        flex: 1;
        min-width: 100px;
      }

      &-content {
        padding: 10px;
        flex: 9;

        input {
          border: none;
          border-bottom: 1px solid #1e687d;
          height: 30px;
          text-indent: 5px;
          line-height: 30px;
          width: 100%;
          color: white;
          background: #154a59;

          &:focus {
            outline:none;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="taskpart">
    <div class="taskpart--header">Rsync</div>
    <div class="taskpart--item">
      <div class="taskpart--item-description">Local path</div>
      <div class="taskpart--item-content"><input :value="task.commands.local" @input="updateCommand('local', $event)" type="text"></div>
    </div>
    <div class="taskpart--item">
      <div class="taskpart--item-description">Remote path</div>
      <div class="taskpart--item-content"><input :value="task.commands.remote" @input="updateCommand('remote', $event)" type="text"></div>
    </div>
    <div class="taskpart--item">
      <div class="taskpart--item-description">Exclude</div>
      <div class="taskpart--item-content"><input :value="task.commands.exclude" @input="updateCommand('exclude', $event)" type="text" placeholder="Enter a pattern here (support for multiple coming soon)"></div>
    </div>
    <div class="taskpart--item">
      <div class="taskpart--item-description">Include</div>
      <div class="taskpart--item-content"><input :value="task.commands.include" @input="updateCommand('include', $event)" type="text" placeholder="Enter a pattern here (support for multiple coming soon)"></div>
    </div>
    <div class="taskpart--item">
      <div class="taskpart--item-description">Flags</div>
      <div class="taskpart--item-content"><input :value="task.commands.flags" @input="updateCommand('flags', $event)" type="text" placeholder="Flags for the rsync command"></div>
    </div>
  </div>
</template>

<script>
  import * as types from '../../../vuex/mutation-types'
  export default {
    props: ['task'],
    methods: {
      updateCommand (option, e) {
        this.$store.commit(types.UPDATE_TASK_COMMAND_OPTION, {task: this.task, option: option, value: e.target.value})
      }
    }
  }
</script>
