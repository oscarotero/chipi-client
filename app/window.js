const electron = require('electron');
const path = require('path');

function createWindow() {
    const { screen, BrowserWindow } = electron;
    const screenSize = screen.getPrimaryDisplay().size;

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: screenSize.height,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        hasShadow: false,
        thickFrame: true,
        show: false,
        webPreferences: {
            defaultEncoding: 'UTF-8',
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: false
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('ch://localhost/index.html');

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => (mainWindow = null));

    return mainWindow;
}

function toggleWindow(win) {
    if (win.isVisible()) {
        hideWindow(win);
    } else {
        showWindow(win);
    }
}

function showWindow(win) {
    win.show();
}

function hideWindow(win) {
    win.blur();
    win.hide();
}

module.exports = { createWindow, showWindow, hideWindow, toggleWindow };
