export const SUGGESTIONS_INIT = 'SUGGESTIONS_INIT';
export const SUGGESTIONS_FETCHING = 'SUGGESTIONS_FETCHING';
export const SUGGESTIONS_LOADED = 'SUGGESTIONS_LOADED';
export const SUGGESTIONS_ERROR = 'SUGGESTIONS_ERROR';

export function suggestionsInit() {
    return {
        type: SUGGESTIONS_INIT
    }
}

export function suggestionsFetching() {
    return {
        type: SUGGESTIONS_FETCHING
    }
}

export function suggestionsError() {
    return {
        type: SUGGESTIONS_ERROR
    }
}

export function suggestionsLoaded(suggestions) {
    return {
        type: SUGGESTIONS_LOADED,
        suggestions
    }
}