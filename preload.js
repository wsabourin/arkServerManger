const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  saveValue: (value) => ipcRenderer.send('saveValue', value),
  loadValue: () => ipcRenderer.send('loadValue'),
  on: (channel, callback) =>
    ipcRenderer.on(channel, (event, ...args) => callback(...args))
})
