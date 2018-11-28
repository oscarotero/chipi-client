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
            return Object.assign({}, state, {
                query: action.query
            });

        case QUERY_APPEND:
            return Object.assign({}, state, {
                query: `${state.query || ''} ${action.query || ''} `
            });

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
            const panels = state.panels.slice(0).concat(panel);

            return Object.assign({}, state, {
                panels
            });

        case PANEL_PUSH:
            return Object.assign({}, state, {
                panels: state.panels.concat([action.panel])
            });

        case PANEL_POP:
            return Object.assign({}, unselectResult(state), {
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

function selectResult(panel, id) {
    return Object.assign({}, panel, {
        results: panel.results.map(result => 
            Object.assign({}, result, {
                selected: result.id === id
            })
        )
    })
}

function unselectResult(panel) {
    return Object.assign({}, panel, {
        results: panel.results.map(result => 
            Object.assign({}, result, {
                selected: false
            })
        )
    })
}