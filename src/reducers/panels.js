import { PANEL_PUSH, PANEL_POP, PANEL_POP_ALL } from '../actions/panel.js';

export function panels(state = [], action) {
    switch (action.type) {
        case PANEL_PUSH:
            return state.concat([action.panel]);

        case PANEL_POP:
            return state.slice(0, -1);

        case PANEL_POP_ALL:
            return [];

        default:
            return state;
    }
}
