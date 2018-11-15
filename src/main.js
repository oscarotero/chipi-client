//Allow to use window.fetch() with ch:// protocol
if (document.location.protocol === 'ch:') {
    const { webFrame } = require('electron');
    webFrame.registerURLSchemeAsPrivileged("ch");
}

//Import components
import './components/command.js';
import './components/container.js';
import './components/flag.js';
import './components/header.js';
import './components/logo.js';
import './components/navlist.js';
import './components/panel.js';
import './components/result.js';
import './components/results.js';
import './components/search.js';
import './components/suggestion.js';

//Create the app
const app = document.getElementById('app');

app.innerHTML = `
    <header is="chipi-header" class="app-header"></header>
    <chipi-container class="app-content"></chipi-container>
`;
