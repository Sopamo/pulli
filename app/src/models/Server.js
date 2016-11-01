import Client from '../ssh/Client'
import uuid from 'uuid'
import store from '../vuex/store'
import * as types from '../vuex/mutation-types'

export default class {
  constructor(data) {
    if (!data.id) {
      this.id = uuid.v4()
    } else {
      this.id = data.id
    }
    this.ip = data.ip
    this.port = data.port
    this.name = data.name
    this.username = data.username
    this.privateKey = data.privateKey
    this.passphrase = data.passphrase
    this.state = data.state
  }

  testConnection() {
    return Client.testConnection(this)
  }

  selfTest() {
    this.state = STATE_TESTING
    this.save()
    this.testConnection().then(() => {
      this.state = STATE_OK
      this.save()
    }, () => {
      this.state = STATE_NOK
      this.save()
    })
  }

  save() {
    store.commit(types.SAVE_SERVER, this.data)
  }

  get data() {
    return {
      id: this.id,
      ip: this.ip,
      port: this.port,
      name: this.name,
      username: this.username,
      privateKey: this.privateKey,
      passphrase: this.passphrase,
      state: this.state
    }
  }
}

export const STATE_OK = 0
export const STATE_NOK = 1
export const STATE_TESTING = 2
