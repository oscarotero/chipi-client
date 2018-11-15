//Create the redux store
import { createStore, combineReducers, applyMiddleware, ReduxThunk } from './utils/redux.js';
import { results } from './reducers/results.js';
import { query } from './reducers/query.js';
import { panels } from './reducers/panels.js';

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
        panels,
        action: (state, action) => action.type
    }),
    applyMiddleware(ReduxThunk, logger)
);

export default store;