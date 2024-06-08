const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    console.log(process.platform)
    app.quit()
})

ipcMain.on('saveValue', (event, value) => {
    const data = `value=${value}`
    fs.writeFileSync('config.ini', data)
})

ipcMain.on('loadValue', (event) => {
    try {
        const data = fs.readFileSync('config.ini', 'utf8')
        const value = data.split('=')[1]
        mainWindow.webContents.send('loadValueReply', value)
    } catch (err) {
        console.error('Error loading value:', err)
    }
})
