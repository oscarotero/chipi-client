const { app, ipcMain } = require('electron');

const { createWindow, hideWindow } = require('./app/window');
const { registerScheme, registerBufferProtocol } = require('./app/protocol');

let mainWindow;

registerScheme();

app.on('ready', () => {
    registerBufferProtocol();
    mainWindow = createWindow();
});

app.on('activate', function() {
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
});

app.on('browser-window-blur', function (event, win) {
    if (win === mainWindow) {
        hideWindow(mainWindow);
    }
})

ipcMain.on('hide-window', () => hideWindow(mainWindow));
