import Client from '../ssh/Client'
import store from '../vuex/store'
import Rsync from 'rsync'

export default class {
  constructor(data) {
    this.id = data.id
    this.commands = data.commands
    this.name = data.name
    this.serverId = data.serverId
    this.type = data.type
  }

  execute() {
    switch (this.type) {
      case 'ssh':
        this.executeSSH()
        break
      case 'rsync':
        this.executeRsync()
        break
      default:
        alert('Unknown task type: ' + this.type)
    }
  }

  executeSSH() {
    let server = store.getters.servers.find(s => s.id === this.serverId)
    this.commands.split('\n').forEach(command => Client.execute(command, server))
  }

  executeRsync() {
    let server = store.getters.servers.find(s => s.id === this.serverId)

    if (!this.commands.remote || !this.commands.local) {
      alert('Please enter at least a local and remote path.')
      return
    }
    var rsync = new Rsync()
      .shell('ssh -i ' + server.privateKey)
      .flags(this.commands.flags)
      .source(this.commands.local)
      .destination(server.username + '@' + server.ip + ':' + this.commands.remote)

    // Execute the command
    rsync.execute(function(error, code, cmd) {
      console.log(error)
      console.log(code)
      console.log(cmd)
    })
  }

}
