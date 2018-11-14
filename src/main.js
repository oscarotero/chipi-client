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
import { createStore, combineReducers, applyMiddleware, ReduxThunk } from './utils/redux.js';
import { results } from './reducers/results.js';
import { query } from './reducers/query.js';

const logger = store => next => action => {
    // console.log('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState())
    return result
}

const store = createStore(
    combineReducers({
        results,
        query,
        action: (state, action) => action.type
    }),
    {
        results: {},
        pannels: []
    },
    applyMiddleware(ReduxThunk, logger)
);

//Create the app
const app = document.getElementById('app');

import Container from './app/container.js';
import Header from './app/header.js';

const container = new Container(store);
container.classList.add('app-content');

const header = new Header(store);
header.classList.add('app-header');

//Init the app
app.append(header);
app.append(container);
