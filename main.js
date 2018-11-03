// Modules to control application life and create native browser window
const electron = require('electron');
const {app, protocol, BrowserWindow} = electron;
const {readFile} = require("fs");
const path = require("path");
const {URL} = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
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
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
protocol.registerStandardSchemes(["ch"], { secure: true });

app.on('ready', () => {
  const MIME_TYPES = {
    '.js': 'text/javascript',
    '.json': 'application/json',
  };

  protocol.registerBufferProtocol('ch',
    (request, respond) => {
      const pathName = new URL(request.url).pathname;

      readFile(path.join(__dirname, pathName), (error, data) => {
        const mimeType = MIME_TYPES[path.extname(pathName).toLowerCase()];
        respond({mimeType, data}); 
      });
    },
    (error) => {
      if (error) {
        console.error(`Failed to register ${scheme} protocol`, error);
      }
    }
  );

  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
