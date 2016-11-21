const {
  app,
  Menu,
  remote
} = require('electron')
let ipc = require('electron').ipcMain

const template = [{
  label: 'Pulli',
  submenu: [{
    role: 'about'
  }]
}, {
  label: 'Config',
  submenu: [{
    label: 'backup',
    click(item, focusedWindow) {
      focusedWindow.send('make-backup')
    }
  }, {
    label: 'restore'
  }]
}, {
  label: "Edit",
  submenu: [{
    label: "Undo",
    accelerator: "CmdOrCtrl+Z",
    selector: "undo:"
  }, {
    label: "Redo",
    accelerator: "Shift+CmdOrCtrl+Z",
    selector: "redo:"
  }, {
    type: "separator"
  }, {
    label: "Cut",
    accelerator: "CmdOrCtrl+X",
    selector: "cut:"
  }, {
    label: "Copy",
    accelerator: "CmdOrCtrl+C",
    selector: "copy:"
  }, {
    label: "Paste",
    accelerator: "CmdOrCtrl+V",
    selector: "paste:"
  }, {
    label: "Select All",
    accelerator: "CmdOrCtrl+A",
    selector: "selectAll:"
  }]
}]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
