//Allow to use window.fetch() with ch:// protocol
if (document.location.protocol === 'ch:') {
    const { webFrame } = require('electron');
    webFrame.registerURLSchemeAsPrivileged("ch");
}

//Import components
import './components/chipi-command.js';
import './components/chipi-flag.js';
import './components/chipi-logo.js';
import './components/chipi-navlist.js';
import './components/chipi-panel.js';
import './components/chipi-result.js';
import './components/chipi-search.js';
import './components/chipi-suggestion.js';


//Create the app
const container = document.getElementById('app');
const logo = document.getElementById('chipi-logo');
const search = document.getElementById('search-form');
const results = document.getElementById('search-results');

import { createStore, combineReducers, applyMiddleware } from './utils/redux.js';

const logger = store => next => action => {
    console.log('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState())
    return result
}

import { Suggestions, suggestions } from './app/suggestions.js';
const store = createStore(suggestions, applyMiddleware(logger));


const suggestionsElement = new Suggestions(store);
results.append(suggestionsElement);

//Import app components

// import App from './utils/app.js';


// const app = new App({ container, logo, search, results });


// //Add routes
// import routeSuggestions from './routes/suggestions.js';
// import routeSearch from './routes/search.js';
// import routeDetails from './routes/details.js';

// app.on('suggestions', routeSuggestions);
// app.on('search', routeSearch);
// app.on('details', routeDetails);


// //Init
// import { onkeydown } from './utils/helpers.js';

// app.run(() => {
//     const { search } = app.data;

//     search.addEventListener('submit', event => {
//         event.preventDefault();

//         if (search.value) {
//             app.go('search', search.value);
//         } else {
//             app.go('suggestions');
//         }
//     })

//     onkeydown('Escape', search.input, () => {
//         if (!search.value) {
//             app.go('suggestions');
//         }
//     })
// });

// app.go('suggestions');
