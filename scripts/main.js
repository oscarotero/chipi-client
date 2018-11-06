//Register components
import Logo from './components/logo.js';
import Suggestion from './components/suggestion.js';
import Search from './components/search.js';
import Results from './components/results.js';
import Result from './components/result.js';
import Panel from './components/panel.js';

customElements.define('chipi-logo', Logo);
customElements.define('chipi-suggestion', Suggestion);
customElements.define('chipi-panel', Panel);
customElements.define('chipi-search', Search, { extends: 'form' });
customElements.define('chipi-results', Results, { extends: 'ul' });
customElements.define('chipi-result', Result, { extends: 'article' });


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
app.run(() => {
    const { search } = app.data;

    search.addEventListener('submit', event => {
        event.preventDefault();

        if (search.value) {
            app.go('search');
        } else {
            app.go('suggestions');
        }
    })
});

app.go('suggestions');
