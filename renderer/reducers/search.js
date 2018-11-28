import {
    QUERY_REPLACE,
    QUERY_APPEND,
    RESULTS_LOADING,
    RESULTS_LOADED,
    RESULTS_ERROR,
    SELECT_RESULT,
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
            return { ...state, query: action.query };

        case QUERY_APPEND:
            return { ...state, query: `${state.query || ''} ${action.query || ''} ` };

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

        case SELECT_RESULT:
            if (!state.panels.length) {
                return selectResult(state, action.id);
            }

            const panel = selectResult(state.panels.pop(), action.id);
            const panels = [...state.panels, panel];

            return { ...state, panels };

        case PANEL_PUSH:
            return { ...state, panels: [...state.panels, action.panel] };

        case PANEL_POP:
            return {
                ...unselectResult(state),
                panels: state.panels.slice(0, -1)
            };

        case PANEL_POP_ALL:
            return { ...state, panels: [] };

        default:
            return state;
    }
}

function selectResult(panel, id) {
    return {
        ...panel,
        results: panel.results.map(result => ({
            ...result,
            selected: result.id === id
        }))
    };
}

function unselectResult(panel) {
    return {
        ...panel,
        results: panel.results.map(result => ({
            ...result,
            selected: false
        }))
    };
}
