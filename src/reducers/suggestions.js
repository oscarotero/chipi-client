import {
    SUGGESTIONS_FETCHING,
    SUGGESTIONS_LOADED,
    SUGGESTIONS_ERROR,
} from '../actions/suggestions.js';

export function suggestions(state = [], action) {
    switch (action.type) {
        case SUGGESTIONS_FETCHING:
        case SUGGESTIONS_ERROR:
            return [];

        case SUGGESTIONS_LOADED:
            return action.suggestions;
        
        default:
            return state;
    }
}