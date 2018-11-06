import App from '../utils/app.js';
import { on } from '../utils/helpers.js';

//Create the app
const container = document.getElementById('app');
const logo = document.getElementById('chipi-logo');
const results = document.getElementById('search-results-list');
const search = document.getElementById('search-form');

const app = new App({ logo, results, search, container });

//Import sub-apps
import detailsApp from './details/details.js';

detailsApp.parent = app;

//Add routes
import _start from './_start.js';
import _search from './_search.js';

app.on('start', _start);
app.on('search', _search);
app.on('details', (app, data) => detailsApp.go('show', data));

//Init
app.run(() => {
    const { search } = app.data;

    //Click on suggestions
    on('click', results, 'chipi-suggestion', (ev, suggestion) => {
        search.value = suggestion.value;
        app.go('search');
    });

    //Click on results
    on('click', results, '.result', (ev, result) => app.go('details', result));

    //Submit the search form
    search.addEventListener('submit', e => {
        e.preventDefault();

        if (search.value) {
            app.go('search');
        } else {
            app.go('start');
        }
    });

    search.addEventListener('input', e => {
        if (!search.value) {
            app.go('start');
        }
    });

    document.addEventListener('keydown', e => {
        //Autofocus
        if (
            e.code.startsWith('Key') &&
            document.activeElement !== search.input
        ) {
            search.input.focus();
        }

        if (e.code === 'ArrowDown') {
            results.focus();
        }
    });
});

export default app;
