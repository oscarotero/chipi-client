export const RESULTS_INIT = 'RESULTS_INIT';
export const RESULTS_FETCHING = 'RESULTS_FETCHING';
export const RESULTS_LOADED = 'RESULTS_LOADED';
export const RESULTS_ERROR = 'RESULTS_ERROR';

export function resultsFetching() {
    return {
        type: RESULTS_FETCHING
    }
}

export function resultsInit() {
    return {
        type: RESULTS_INIT
    }
}

export function resultsError() {
    return {
        type: RESULTS_ERROR
    }
}

export function resultsLoaded(results) {
    return {
        type: RESULTS_LOADED,
        results
    }
}