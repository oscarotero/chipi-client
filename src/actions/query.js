export const QUERY_REPLACE = 'QUERY_REPLACE';
export const QUERY_APPEND = 'QUERY_APPEND';

import {loadResults} from './results.js';

export function replaceQuery(query) {
    return function(dispatch) {
        dispatch({
            type: QUERY_REPLACE,
            query
        });

        dispatch(loadResults());
    }
}

export function appendQuery(query) {
    return function(dispatch) {
        dispatch({
            type: QUERY_APPEND,
            query
        });

        dispatch(loadResults());
    }
}
