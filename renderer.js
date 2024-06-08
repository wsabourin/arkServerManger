const textInput = document.getElementById('textInput')
const saveButton = document.getElementById('saveButton')
const loadButton = document.getElementById('loadButton')

saveButton.addEventListener('click', () => {
    const value = textInput.value
    electron.saveValue(value)
})

loadButton.addEventListener('click', () => {
    electron.loadValue()
})

electron.on('loadValueReply', (value) => {
    textInput.value = value
})
