import Client from '../ssh/Client'
import store from '../vuex/store'

export default class {
  constructor(data) {
    this.id = data.id
    this.commands = data.commands
    this.name = data.name
    this.serverId = data.serverId
  }

  execute() {
    let server = store.getters.servers.find(s => s.id === this.serverId)
    this.commands.split('\n').forEach(command => Client.execute(command, server))
  }

}
