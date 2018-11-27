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
import './components/session.js';
import './components/results/suggestion.js';
import './components/results/result.js';
import './components/details/detail.js';

document.documentElement.addEventListener('focus', e => {
    console.log(e.target);
})

setInterval(() => console.log(document.activeElement), 2000);