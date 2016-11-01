<style scoped>
  .state-indicator {
    color: red;
    padding: 0 5px;
  }

  .icon-check {
    color: green;
  }

  .icon-cancel-circled {
    color: red;
  }

  .icon-hourglass {
    color: gray;
  }
</style>

<template>
  <span class="state-indicator icon" :class="classlist"></span>
</template>

<script>
  import {STATE_OK, STATE_NOK, STATE_TESTING} from '../../models/Server'

  export default {
    props: ['server'],
    computed: {
      classlist() {
        if (this.server.state === STATE_OK) {
          return {
            'icon-check': true
          }
        }
        if (this.server.state === STATE_NOK) {
          return {
            'icon-cancel-circled': true
          }
        }
        if (this.server.state === STATE_TESTING) {
          return {
            'icon-hourglass': true
          }
        }

        return {
          'icon-help-circled': true
        }
      }
    }
  }
</script>
