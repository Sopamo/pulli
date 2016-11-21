<style lang="scss" scoped>
  .terminal {
    background: #032833;
    color: #849496;
    font-family: monospace;
    padding: 10px;
    box-shadow: 0 -2px 15px 0px rgba(0,0,0,0.5);
    position: relative;
    height: 100px;
  }

  .lines-wrapper {
    max-height: 40vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .line {

    span {
      -webkit-user-select: text !important;
      user-select: text !important;

      &::selection {
        background: #043540;
        color: #94A1A1;
      }
    }

    .icon-right-open {
      margin-right: 5px;
    }

    &.type-input {
      font-weight: bold;
      color: white;
    }
  }

  .inputform {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .input {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    line-height: 30px;
    outline: none !important;
    background: #032833;
    width: 100%;
    border: none;
    padding: 0 10px 0 20px;
  }

  .indicator {
    position: absolute;
    left: 5px;
    line-height: 30px;
    bottom: 0;
    display: block;
  }

  .grabber {
    height: 5px;
    background: #020a0c;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: height .1s ease-out;
    cursor: ns-resize;
  }

</style>

<template>
  <div class="terminal" ref="terminal" :style="terminalStyle">
    <div class="grabber" ref="grabber"></div>
    <div class="lines-wrapper" ref="linesWrapper">
      <div v-if="terminal" v-for="line in terminal.lines" class="line" :class="{'type-input': line.type == 'input'}"><span class="icon icon-right-open" v-if="line.type == 'input'"></span><span v-html="nl2br(line.content)"></span></div>
    </div>
    <form @submit.prevent="executeInput" class="inputform">
      <input ref="input" type="text" class="input" v-model="input">
      <div class="indicator">$</div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import Client from '../../ssh/Client'
  export default {
    props: ['server'],
    data() {
      return {
        input: null,
        currentlyDragging: 0,
        currentlyResizing: 0,
        terminalStyle: {
          height: '200px'
        }
      }
    },
    created() {
      Vue.nextTick(() => {
        // Handle text selection and focus event of the terminal
        // When the mouse is clicked, set the state to 1
        this.$refs.terminal.addEventListener('mousedown', () => {
          this.currentlyDragging = 1
        })

        // When the mouse is moved and has been clicked before we are selecting text
        this.$refs.terminal.addEventListener('mousemove', () => {
          if (this.currentlyDragging === 1) {
            this.currentlyDragging = 2
          }
        })

        // Trigger the focus event only when we are not currently selecting text
        this.$refs.terminal.addEventListener('mouseup', () => {
          if (this.currentlyDragging === 2) {
            this.currentlyDragging = 0
          } else {
            this.$refs.input.focus()
          }
        })

        // Scroll the terminal to the bottom
        this.$refs.linesWrapper.scrollTop = this.$refs.linesWrapper.scrollHeight

        /** Height change */
        this.$refs.grabber.addEventListener('mousedown', () => {
          this.currentlyResizing = 1
        })

        // When the mouse is moved and has been clicked before we are selecting text
        // TODO: Fix the memory leak ;)
        document.body.addEventListener('mousemove', (e) => {
          if (this.currentlyResizing === 1) {
            this.terminalStyle.height = Math.max(50, parseInt(this.terminalStyle.height) - e.movementY) + 'px'
          }
        })

        // Trigger the focus event only when we are not currently selecting text
        document.body.addEventListener('mouseup', () => {
          this.currentlyResizing = 0
        })
      })
    },
    computed: {
      ...mapGetters([
        'terminals'
      ]),
      terminal: function() {
        if (!this.server.id) {
          return false
        }
        let terminal = this.terminals[this.server.id]
        if (typeof terminal === 'undefined') {
          return false
        }
        return terminal
      }
    },
    methods: {
      handleClick() {
        this.$refs.input.focus()
      },
      executeInput() {
        let input = this.input
        this.input = null
        Client.execute(input, this.server)
      },
      nl2br(input) {
        if (!input) {
          return ''
        }
        return input.replace(/ /g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
      }
    },
    watch: {
      terminal: {
        handler: function() {
          Vue.nextTick(() => {
            this.$refs.linesWrapper.scrollTop = this.$refs.linesWrapper.scrollHeight
          })
        },
        deep: true
      }
    }
  }
</script>
