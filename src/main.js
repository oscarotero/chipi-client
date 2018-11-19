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
import { html } from './utils/helpers.js';

//Create the app
const app = document.getElementById('app');
const config = document.getElementById('config');

app.innerHTML = `
    <header is="chipi-header" class="app-header"></header>
    <chipi-container class="app-content"></chipi-container>
`;
app.after(html`
    <div class="help">
        <p>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            Press Up/Down to select a result
        </p>
        <p>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            Press Right to view details
        </p>
    </div>
`);

document.querySelector('.app-session').addEventListener('click', ev => {
    showConfig();
})
document.querySelector('.app-back').addEventListener('click', ev => {
    hideConfig();
})
function showConfig () {
    app.animate({
        transform: ['rotateY(0)', 'rotateY(-180deg)']
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
    config.animate({
        transform: ['rotateY(180deg)', 'rotateY(0)'],
        opacity: [0, 0, 1]
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
}
function hideConfig () {
    app.animate({
        transform: ['rotateY(-180deg)', 'rotateY(0)']
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
    config.animate({
        transform: ['rotateY(0)', 'rotateY(180deg)'],
        opacity: [1, 1, 0]
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
}
