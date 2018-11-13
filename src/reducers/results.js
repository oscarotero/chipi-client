import {
    RESULTS_FETCHING,
    RESULTS_LOADED,
    RESULTS_ERROR,
} from '../actions/results.js';

export function results(state = [], action) {
    switch (action.type) {
        case RESULTS_FETCHING:
        case RESULTS_ERROR:
            return [];

        case RESULTS_LOADED:
            return action.suggestions;
        
        default:
            return state;
    }
}