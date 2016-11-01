<style lang="scss">
.command {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #EAEAEA;
  background: linear-gradient(to bottom, #fefefe 0%,#f6f6f8 100%);
  padding: 5px 0;

  .command-action {
    width: 40px;
    font-size: 30px;
    line-height: 45px;
    padding-left: 10px;
  }

  &-description {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &-title {
    font-weight: bold;
  }

  &-meta {
  }
}
</style>

<template>
<div class="title-bar-wrapper">
  <div class="title-bar">
    <h1 @click="selfTest"><state-indicator :server="server"></state-indicator>{{ server.name }} <span class="subtitle">{{ server.username }}@{{ server.ip }}</span></h1>
  </div>
  <div class="commands-list">
    <div v-for="i in [1,2,3]" class="command">
      <div class="command-action"><span class="icon icon-play"></span></div>
      <div class="command-description">
        <div class="command-title">Sopamo.de deploy</div>
        <div class="command-meta">5 mins ago</div>
      </div>
    </div>
  </div>
  <terminal style="position: absolute;bottom: 0;left: 0;right:0" :server="server"></terminal>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StateIndicator from './partials/StateIndicator'
  import Terminal from './partials/Terminal'

  export default {
    computed: {
      ...mapGetters([
        'servers'
      ]),
      server() {
        return this.servers[this.$route.params.index]
      }
    },
    methods: {
      selfTest() {
        this.server.selfTest()
      }
    },
    components: {
      StateIndicator,
      Terminal
    }
  }
</script>
