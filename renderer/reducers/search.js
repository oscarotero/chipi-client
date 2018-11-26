import {
    QUERY_REPLACE,
    QUERY_APPEND,
    RESULTS_LOADING,
    RESULTS_LOADED,
    RESULTS_ERROR,
    PANEL_PUSH,
    PANEL_POP,
    PANEL_POP_ALL
} from '../actions/search.js';

const defaults = {
    query: '',
    flags: [],
    results: [],
    panels: []
};

export function search(state = defaults, action) {
    switch (action.type) {
        case QUERY_REPLACE:
            return {
                query: action.query,
                flags: [],
                results: [],
                panels: []
            };

        case QUERY_APPEND:
            return {
                query: `${state.query || ''} ${action.query || ''} `,
                flags: [],
                results: [],
                panels: []
            };

        case RESULTS_LOADING:
        case RESULTS_ERROR:
            return {
                query: state.query,
                flags: [],
                results: [],
                panels: []
            };

        case RESULTS_LOADED:
            return {
                query: state.query,
                flags: action.results.flags || [],
                results: action.results.results || [],
                panels: []
            };

        case PANEL_PUSH:
            return Object.assign({}, state, {
                panels: state.panels.concat([action.panel])
            });

        case PANEL_POP:
            return Object.assign({}, state, {
                panels: state.panels.slice(0, -1)
            });

        case PANEL_POP_ALL:
            return Object.assign({}, state, {
                panels: []
            });

        default:
            return state;
    }
}
