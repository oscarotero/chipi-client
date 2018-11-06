import App from '../utils/app.js';

//Create the app
const container = document.getElementById('app');
const logo = document.getElementById('chipi-logo');
const search = document.getElementById('search-form');
const results = document.getElementById('search-results');

const app = new App({ container, logo, search, results });

//Import sub-apps
import detailsApp from './details/details.js';

detailsApp.parent = app;

//Add routes
import routeSuggestions from './route-suggestions.js';
import routeSearch from './route-search.js';

app.on('suggestions', routeSuggestions);
app.on('search', routeSearch);
app.on('details', (app, data) => detailsApp.go('show', data));

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

export default app;
