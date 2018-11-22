import { QUERY_REPLACE, QUERY_APPEND } from '../actions/query.js';

export function query(state = null, action) {
    switch (action.type) {
        case QUERY_REPLACE:
            return action.query || null;

        case QUERY_APPEND:
            return `${state || ''} ${action.query || ''} `;

        default:
            return state;
    }
}
