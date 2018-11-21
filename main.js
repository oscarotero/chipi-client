const { app, ipcMain, globalShortcut } = require('electron');
const { createWindow, hideWindow, toggleWindow } = require('./app/window');
const { registerScheme, registerBufferProtocol } = require('./app/protocol');

let mainWindow;

registerScheme();

app.on('ready', () => {
    registerBufferProtocol();
    mainWindow = createWindow();
    globalShortcut.register('Control+Space', () => toggleWindow(mainWindow));
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
});

app.on('browser-window-blur', (event, win) => {
    if (win === mainWindow) {
        hideWindow(mainWindow);
    }
});

app.on('will-quit', () => globalShortcut.unregisterAll());

ipcMain.on('hide-window', () => hideWindow(mainWindow));
