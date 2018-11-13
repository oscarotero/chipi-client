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

//Create the redux store
import { createStore, combineReducers, applyMiddleware } from './utils/redux.js';
import { suggestions } from './reducers/suggestions.js';
import { results } from './reducers/results.js';

const logger = store => next => action => {
    console.log('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState())
    return result
}

const store = createStore(
    combineReducers({
        suggestions,
        results,
        action: (state, action) => action.type
    }),
    {
        query: '',
        suggestions: [],
        flags: [],
        results: [],
        detail: {}
    },
    applyMiddleware(logger)
);

//Create the app
const app = document.getElementById('app');
const logo = document.getElementById('chipi-logo');
const search = document.getElementById('search-form');

import Container from './app/container.js';

const content = new Container(store);
content.classList.add('app-content');
app.append(content);

//Init the app
import {suggestionsInit} from './actions/suggestions.js';
store.dispatch(suggestionsInit());
