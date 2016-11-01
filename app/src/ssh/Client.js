let Client = require('ssh2').Client
import store from '../vuex/store'
import * as types from '../vuex/mutation-types'

function executeCommand(cmd, server) {
  return new Promise((resolve, reject) => {
    addLine(server, {
      content: cmd,
      type: 'input'
    })
    var conn = new Client()
    conn.on('ready', function() {
      conn.exec(cmd, function(err, stream) {
        if (err) {
          reject(err)
          throw err
        }
        stream.on('close', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
          conn.end()
        }).on('data', function(data) {
          addLine(server, {
            content: data.toString(),
            type: 'output'
          })
          resolve(data)
          console.log('STDOUT: ' + data)
        }).stderr.on('data', function(data) {
          addLine(server, {
            content: data.toString(),
            type: 'output-error'
          })
          reject(data)
          console.log('STDERR: ' + data)
        })
      })
    }).connect({
      host: server.ip,
      port: server.port,
      username: server.username,
      privateKey: require('fs').readFileSync(server.privateKey),
      passphrase: server.passphrase
    })
  })
}

function addLine(server, line) {
  store.commit(types.ADD_TERMINAL_LINE, {line: line, serverId: server.id})
}

export default {
  testConnection: server => executeCommand('uptime', server),
  execute: (cmd, server) => executeCommand(cmd, server)
}
