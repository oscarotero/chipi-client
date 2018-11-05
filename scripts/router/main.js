import App from './app.js';
import { on } from '../utils.js';

import _start from './start.js';
import _search from './search.js';
import _details from './details.js';

//Create the app
const logo = document.getElementById('chipi-logo');
const results = document.getElementById('search-results-list');
const search = document.getElementById('search-form');

const mainApp = new App({logo, results, search});

//Add routes
mainApp.on('start', _start);
mainApp.on('search', _search);
mainApp.on('details', _details);

//Init
mainApp.run(app => {
    const { search } = app.data;

    //Click on suggestions
    on('click', results, 'chipi-suggestion', () => app.go('search'));

    //Click on results
    on('click', results, '.result', () => app.go('details'));

    //Submit the search form
    search.addEventListener('submit', e => {
        e.preventDefault();

        if (search.value) {
            app.go('search');
        } else {
            app.go('start');
        }
    })

    search.addEventListener('input', e => {
        if (!search.value) {
            app.go('start');
        }
    })

    document.addEventListener('keydown', e => {
        //Autofocus
        if (e.code.startsWith('Key') && document.activeElement !== search.input) {
            search.input.focus();
        }

        if (e.code === 'ArrowDown') {
            results.focus();
        }
    })
});

export default mainApp;