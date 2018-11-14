import { RESULTS_LOADING, RESULTS_LOADED, RESULTS_ERROR } from '../actions/results.js';

export function results(state = [], action) {
    switch (action.type) {
        case RESULTS_LOADING:
        case RESULTS_ERROR:
            return [];

        case RESULTS_LOADED:
            return action.results;

        default:
            return state;
    }
}
