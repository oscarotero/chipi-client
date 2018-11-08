//Allow to use window.fetch() with ch:// protocol
if (document.location.protocol === 'ch:') {
    const { webFrame } = require('electron');
    webFrame.registerURLSchemeAsPrivileged("ch");
}

//Import components
import './components/chipi-command.js';
import './components/chipi-logo.js';
import './components/chipi-navlist.js';
import './components/chipi-panel.js';
import './components/chipi-result.js';
import './components/chipi-search.js';
import './components/chipi-suggestion.js';


//Create the app
import App from './utils/app.js';

const container = document.getElementById('app');
const logo = document.getElementById('chipi-logo');
const search = document.getElementById('search-form');
const results = document.getElementById('search-results');

const app = new App({ container, logo, search, results });


//Add routes
import routeSuggestions from './routes/suggestions.js';
import routeSearch from './routes/search.js';
import routeDetails from './routes/details.js';

app.on('suggestions', routeSuggestions);
app.on('search', routeSearch);
app.on('details', routeDetails);


//Init
import { onkeydown } from './utils/helpers.js';

app.run(() => {
    const { search } = app.data;

    search.addEventListener('submit', event => {
        event.preventDefault();

        if (search.value) {
            app.go('search', search.value);
        } else {
            app.go('suggestions');
        }
    })

    onkeydown('Escape', search.input, () => {
        if (!search.value) {
            app.go('suggestions');
        }
    })
});

app.go('suggestions');
