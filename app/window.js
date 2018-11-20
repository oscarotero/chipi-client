const electron = require('electron');

function createWindow() {
    const { app, screen, BrowserWindow, Tray, Menu } = electron;
    const screenSize = screen.getPrimaryDisplay().size;
    
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: screenSize.height,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        hasShadow: false,
        devTools: true,
        thickFrame: true
    });

    const tray = new Tray(__dirname + '/../icons/tray/icon.png');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show/hide Chipi',
            click() {
                toggleWindow(mainWindow);
            }
        },
        {
            label: 'Quit',
            click() {
                app.quit()
            }
        }
    ])
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);

    // and load the index.html of the app.
    mainWindow.loadURL('ch://localhost/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    return mainWindow;
}


function toggleWindow(win) {
    if (win.isVisible()) {
        hideWindow(win);
    } else {
        showWindow(win);
    }
}

function showWindow (win) {
    win.show();
}

function hideWindow (win) {
    win.blur();
    win.hide();
}

module.exports = { createWindow, showWindow, hideWindow, toggleWindow };