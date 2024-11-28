const { app, BrowserWindow } = require("electron")

const { findWebfishing } = require('./libs/fishfinder');

app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    window.loadFile('./app/app.html')
    findWebfishing();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});