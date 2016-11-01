<style scoped>
img {
  margin-top: -25px;
  width: 450px;
}
</style>

<template>
<div>
  <button class="btn" @click="connect">Connect</button>
  <input type="text" v-model="passphrase">
</div>
</template>

<script>
import CurrentPage from './LandingPageView/CurrentPage'
import Links from './LandingPageView/Links'
import Versions from './LandingPageView/Versions'

export default {
  components: {
    CurrentPage,
    Links,
    Versions
  },
  data() {
    return {
      passphrase: null
    }
  },
  methods: {
    connect() {
    }
  },
  name: 'landing-page'
}
</script>
