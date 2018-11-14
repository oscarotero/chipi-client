export const RESULTS_LOADING = 'RESULTS_LOADING';
export const RESULTS_LOADED = 'RESULTS_LOADED';
export const RESULTS_ERROR = 'RESULTS_ERROR';

import { fetchResults } from '../utils/api.js';

export function loadResults() {
    return function(dispatch, getState) {
        const state = getState();

        dispatch({
            type: RESULTS_LOADING
        })

        fetchResults(state.query).then(results =>
            dispatch({
                type: RESULTS_LOADED,
                results
            })
        );
    };
}
