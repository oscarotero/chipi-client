import Router from './router/router.js';

import searchRoute from './router/search.js';
import startRoute from './router/start.js';

//Create the app
const logo = document.getElementById('chipi-logo');
const results = document.getElementById('search-results-list');
const search = document.getElementById('search-form');

const app = new Router({logo, results, search});

//Add routes
app.on('start', startRoute);
app.on('search', searchRoute);

//Init
app.run(() => {
    const { search } = app.data;

    //Click on suggestions
    results.addEventListener('click', e => {
        if (e.target.tagName === 'CHIPI-SUGGESTION') {
            search.value = e.target.value;
            app.go('search');
        }
    })

    //Submit the search form
    search.addEventListener('submit', e => {
        e.preventDefault();

        if (search.value) {
            app.go('search');
        } else {
            app.go('start');
        }
    })

    document.addEventListener('keydown', e => {
        //Autofocus
        if (e.code.startsWith('Key') && document.activeElement !== search.input) {
            search.input.focus();
        }
    })
});

export default app;