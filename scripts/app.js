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

    //Click on results
    results.addEventListener('click', e => {
        if (e.target.tagName !== 'CHIPI-SUGGESTION') {
            return;
        }
        const panel = document.createElement('chipi-panel');
        panel.classList.add('app-panel');
        panel.innerHTML = `<article class="detail">
        <div class="detail-body">
          <p>Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to recover fully before getting back to work 😀</p>
        </div>
      </article>`;

        results.after(panel);
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

export default app;