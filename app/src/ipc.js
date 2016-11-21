const {
  remote
} = require('electron')
import store from './vuex/store'
const ipcRenderer = require('electron').ipcRenderer
let fs = require('fs')

ipcRenderer.on('make-backup', () => {
  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  remote.dialog.showSaveDialog(function(fileName) {
    if (fileName === undefined) {
      console.log('You didnt save the file')
      return
    }

    let content = JSON.stringify(store.getters.backup)

    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(fileName, content, function(err) {
      if (err) {
        alert('An error ocurred creating the file ' + err.message)
      }

      alert('Backup successful :)')
    })
  })
})
