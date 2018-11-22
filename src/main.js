//Browser
if (document.location.protocol.startsWith('http')) {
    document.documentElement.classList.add('is-browser');
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
import { html, render } from './utils/lit-html.js';

//Create the app
const app = document.getElementById('app');

const tmpl = html`
    <div class="app-front">
        <header is="chipi-header" class="app-header">
            <chipi-logo state=":p" class="app-logo" id="chipi-logo">Chipi</chipi-logo>

            <form class="app-search searchbox" is="chipi-search" id="search-form">
                <input type="search" placeholder="Hi, Paula. What are you looking for?" class="searchbox-input" autofocus>
                <div class="searchbox-render"></div>
                <button type="submit" class="searchbox-submit"></button>
            </form>

            <nav class="app-session session">
                <img src="img/avatar/005.jpg" class="session-avatar">
            </nav>
        </header>
        <chipi-container class="app-content"></chipi-container>
    </div>

    <div class="app-back"></div>

    <div class="help">
        <p>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            <strong class="help-text">Press Up/Down to select a result</strong>
        </p>
        <p>
            <span class="help-keyboard"><svg width="10px" height="10px" viewBox="0 0 10 10"><polygon id="Path" points="30 30 20 30 25 20"></polygon></svg></span>
            <strong class="help-text">Press Right to view details</strong>
        </p>
    </div>
`;

render(tmpl, app);

const front = app.querySelector('.app-front');
const back = app.querySelector('.app-back');

front.querySelector('.session-avatar').addEventListener('click', showConfig);
back.addEventListener('click', hideConfig);

function showConfig () {
    front.animate({
        transform: ['rotateY(0)', 'rotateY(-180deg)']
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
    back.animate({
        transform: ['rotateY(180deg)', 'rotateY(0)'],
        opacity: [0, 0, 1]
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
}
function hideConfig () {
    front.animate({
        transform: ['rotateY(-180deg)', 'rotateY(0)']
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
    back.animate({
        transform: ['rotateY(0)', 'rotateY(180deg)'],
        opacity: [1, 1, 0]
    }, {
        duration: 600,
        easing: 'ease-in-out',
        fill: 'both'
    });
}
