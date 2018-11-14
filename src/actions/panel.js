export const PANEL_LOADING = 'PANEL_LOADING';
export const PANEL_PUSH = 'PANEL_PUSH';
export const PANEL_POP = 'PANEL_POP';
export const PANEL_POP_ALL = 'PANEL_POP_ALL';

import { fetchResult } from '../utils/api.js';

export function loadResult(id) {
    return function(dispatch, getState) {
        dispatch({
            type: PANEL_LOADING
        })

        fetchResult(id).then(panel =>
            dispatch({
                type: PANEL_PUSH,
                panel
            })
        );
    };
}

export function popPanel() {
    return {
        type: PANEL_POP
    }
}