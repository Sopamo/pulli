<template>
<div class="title-bar-wrapper content-padding">
  <div class="title-bar">
    <h1>Add a new server</h1>
  </div>

  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Server IP</label>
      <input type="text" class="form-control" v-model="ip" placeholder="x.x.x.x">
    </div>
    <div class="form-group">
      <label>SSH Port</label>
      <input type="text" class="form-control" v-model="port">
    </div>
    <div class="form-group">
      <label>Server Name</label>
      <input type="text" class="form-control" v-model="name" placeholder="How do you call this machine?">
    </div>
    <div class="form-group">
      <label>SSH Username</label>
      <input type="text" class="form-control" v-model="username" placeholder="Username you login with">
    </div>
    <div class="form-group">
      <label>Private key path</label>
      <input type="text" class="form-control" v-model="privateKey">
    </div>
    <div class="form-group">
      <label>Private key passphrase</label>
      <input type="password" class="form-control"  v-model="passphrase" placeholder="Leave empty for no passphrase">
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-large btn-form btn-primary">Save & Continue</button>
      <button type="submit" @click.prevent="testBtnClick" class="btn btn-large btn-form btn-default">Test connection</button>
    </div>
  </form>
</div>
</template>

<script>
  import Client from '../ssh/Client'
  import {STATE_OK, default as Server} from '../models/Server'

  export default {
    data() {
      return {
        ip: '',
        port: 22,
        name: '',
        username: '',
        privateKey: '/Users/paulmohr/.ssh/id_rsa',
        passphrase: ''
      }
    },
    methods: {
      submit() {
        this.testConnection().then(() => {
          let server = new Server({
            state: STATE_OK,
            ip: this.ip,
            port: this.port,
            name: this.name,
            username: this.username,
            privateKey: this.privateKey,
            passphrase: this.passphrase
          })
          server.save()
        }, err => {
          alert('fail')
          console.log(err)
        })
      },
      testBtnClick() {
        alert('click')
      },
      testConnection() {
        return Client.testConnection({
          ip: this.ip,
          port: this.port,
          username: this.username,
          privateKey: this.privateKey,
          passphrase: this.passphrase
        })
      }
    }
  }
</script>
