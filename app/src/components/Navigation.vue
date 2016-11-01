<style lang="scss">
    .main-navigation {
        width: 200px;
        background: #F5F5F4;
        height: calc(100vh - 40px);
        padding-bottom: 50px;
        position: relative;
        border-right: 1px solid #B4B4B4;

        .list-group-header {
          padding: 8px 10px;
          border-bottom: 1px solid #858585;
        }

        .list-group .list-group-item {
          border-top: none;
        }

        .actions {
            border-top: 1px solid #B4B4B4;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: white;
            text-align: center;
            line-height: 40px;

            .icon-plus {
                font-size: 28px;
            }
        }
    }
</style>

<template>
<div class="main-navigation">
    <ul class="list-group">
        <li class="list-group-header">
            <input class="form-control" v-model="query" type="text" placeholder="Search for a server">
        </li>
        <router-link tag="li" active-class="active" :to="'/servers/' + index" @click="active = index" v-for="(server, index) in filteredServers" class="list-group-item">
            <div class="media-body">
                <strong><state-indicator :server="server"></state-indicator>{{server.name}}</strong>
                <p>{{server.ip}}</p>
            </div>
        </router-link>
    </ul>
    <router-link to="/add-server" class="actions">
        <span class="icon icon-plus"></span>
    </router-link>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import StateIndicator from './partials/StateIndicator'
export default {
  data() {
    return {
      active: null,
      query: null
    }
  },
  computed: {
    ...mapGetters([
      'servers'
    ]),
    filteredServers() {
      let servers = this.servers.filter(server => {
        return this.query === null || server.name.toLocaleLowerCase().indexOf(this.query) !== -1 || server.ip.indexOf(this.query) !== -1
      })
      return servers
    }
  },
  components: {
    StateIndicator
  }
}
</script>
