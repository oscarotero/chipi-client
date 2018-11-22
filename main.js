const { app, ipcMain, globalShortcut } = require('electron');
const settings = require('./app/settings');
const { createWindow, hideWindow, toggleWindow } = require('./app/window');
const { createMenu } = require('./app/menu');
const { registerScheme, registerBufferProtocol } = require('./app/protocol');

let mainWindow;

if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname);
}

registerScheme();

settings.watch('globalShortcut', (newValue, oldValue) => {
    if (oldValue) {
        globalShortcut.unregister(oldValue);
    }

    globalShortcut.register(newValue, () => toggleWindow(mainWindow));
});

app.on('ready', () => {
    registerBufferProtocol();
    mainWindow = createWindow();

    globalShortcut.register(settings.get('globalShortcut'), () => toggleWindow(mainWindow));

    createMenu(mainWindow);
});

app.on('will-quit', () => globalShortcut.unregisterAll());

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
});

app.on('browser-window-blur', (event, win) => {
    if (win === mainWindow && settings.get('hideOnBlur')) {
        hideWindow(mainWindow);
    }
});

ipcMain.on('hide-window', () => {
    if (settings.get('hideOnBlur')) {
        hideWindow(mainWindow);
    }
});
