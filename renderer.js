const { ipcRenderer } = require('electron')

const textInput = document.getElementById('textInput')
const saveButton = document.getElementById('saveButton')
const loadButton = document.getElementById('loadButton')

saveButton.addEventListener('click', () => {
  const value = textInput.value
  ipcRenderer.send('saveValue', value)
})

loadButton.addEventListener('click', () => {
  ipcRenderer.send('loadValue')
})

ipcRenderer.on('loadValueReply', (event, value) => {
  textInput.value = value
})
