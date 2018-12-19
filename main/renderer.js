const { webFrame, ipcRenderer } = require('electron');

//Allow to use window.fetch() with ch:// protocol
webFrame.registerURLSchemeAsPrivileged('ch');

//Hide on click directly in <html> or <body>
window.addEventListener('click', e => {
    if (e.target === document.documentElement || e.target === document.body) {
        ipcRenderer.send('hide-window');
    }
});
