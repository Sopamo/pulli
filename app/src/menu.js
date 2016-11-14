const {app, Menu} = require('electron')
const template = [
  {
    label: 'Pulli',
    submenu: [
      {
        role: 'about'
      }
    ]
  },
  {
    label: 'Config',
    submenu: [
      {
        label: 'backup'
      },
      {
        label: 'restore'
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
