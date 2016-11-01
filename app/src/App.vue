<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.main-container {
    display: flex;
    height: calc(100vh - 40px);
}

.content-container {
    flex: 1;
    position: relative;
}

.frame-bar {
  height: 40px;
  background: url('../img/cover-pumpkin.jpg');
  -webkit-app-region: drag;
  -webkit-user-select: none;
  text-align: center;
  color: white;
  font-size: 18px;
  line-height: 40px;
}

.title-bar {
  -webkit-backdrop-filter: blur(5px);
  background: #F5F5F4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  border-bottom: 1px solid #858585;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.2);

  h1 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    text-shadow: 0px 1px 1px #ffffff;
    color: #222;

    .subtitle {
      color: #555;
      font-size: 12px;
      font-weight: normal;
    }
  }
}

.content-padding {
  padding: 10px;

  &.title-bar-wrapper {
    padding-top: 60px;
  }
}

.title-bar-wrapper {
  padding-top: 50px;
}

</style>

<template>
<div style="height: 100%">
  <div class="frame-bar">Pulli</div>
  <div class="main-container">
    <navigation></navigation>
    <div class="content-container">
        <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import '../css/photon.min'
import Navigation from './components/Navigation'
import store from 'src/vuex/store'

export default {
  store,
  components: {
    Navigation
  }
}
</script>
