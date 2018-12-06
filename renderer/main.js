//Browser
if (document.location.protocol.startsWith('http')) {
    document.documentElement.classList.add('is-browser');
}

//Import components
import './components/app.js';
import './components/command.js';
import './components/flag.js';
import './components/logo.js';
import './components/navlist.js';
import './components/panel.js';
import './components/searchbox.js';
import './components/welcome.js';
import './components/welcome-logo.js';
import './components/session.js';
import './components/results/suggestion.js';
import './components/results/result.js';
import './components/details/slack.js';
import './components/details/gmail.js';
import './components/details/trello.js';

import store from './store.js';
import { back } from './actions/search.js';

//Autofocus
document.addEventListener('keydown', event => {
    const input = document.querySelector('.searchbox-input');

    if (!input) {
        return;
    }

    if (
        (event.code.startsWith('Key') || event.code === 'Backspace') &&
        document.activeElement !== input &&
        !event.metaKey &&
        !event.ctrlKey
    ) {
        input.focus();
        return;
    }

    if (event.code === 'Escape') {
        store.dispatch(back());
    }
});
// setInterval(() => console.log(document.activeElement), 2000);
