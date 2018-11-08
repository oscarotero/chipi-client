const electron = require('electron');
const { app, protocol, BrowserWindow } = electron;
const { readFile } = require('fs');
const path = require('path');
const { URL } = require('url');

let mainWindow;

function createWindow() {
    // Create the browser window.
    const screen = electron.screen.getPrimaryDisplay().size;

    mainWindow = new BrowserWindow({
        width: 1000,
        height: screen.height - 400,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        hasShadow: false,
        devTools: true,
        thickFrame: true,
    });

    // and load the index.html of the app.
    mainWindow.loadURL('ch://localhost/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

// Register ch:// scheme
protocol.registerStandardSchemes(['ch'], { secure: true });

app.on('ready', () => {
    const MIME_TYPES = {
        '.js': 'text/javascript',
        '.json': 'application/json'
    };

    protocol.registerBufferProtocol(
        'ch',
        (request, respond) => {
            const pathName = new URL(request.url).pathname;

            readFile(path.join(__dirname, pathName), (error, data) => {
                const mimeType = MIME_TYPES[path.extname(pathName).toLowerCase()];
                respond({ mimeType, data });
            });
        },
        error => {
            if (error) {
                console.error(`Failed to register ${scheme} protocol`, error);
            }
        }
    );

    createWindow();
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
