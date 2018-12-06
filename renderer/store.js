//Create the redux store
import { createStore, combineReducers, applyMiddleware, ReduxThunk } from './utils/redux.js';
import { search } from './reducers/search.js';
import { user } from './reducers/user.js';

const logger = store => next => action => {
    const result = next(action);
    console.log(action.type + ' => ', store.getState());
    return result;
};

const defaults = {
    user: {
        name: 'Paul',
        avatar: 'img/avatar/004.jpg'
    }
};

const store = createStore(
    combineReducers({
        search,
        user,
        action: (state, action) => action.type
    }),
    defaults,
    applyMiddleware(ReduxThunk, logger)
);

export default store;
