export const PANEL_LOADING = 'PANEL_LOADING';
export const PANEL_PUSH = 'PANEL_PUSH';
export const PANEL_POP = 'PANEL_POP';
export const PANEL_POP_ALL = 'PANEL_POP_ALL';

export function loadResult(id) {
    return function(dispatch, getState) {
        const results = getState().search.results;
        const panel = results.find(result => result.id === id);

        if (panel) {
            dispatch({
                type: PANEL_PUSH,
                panel
            });
        }
    };
}

export function popPanel() {
    return {
        type: PANEL_POP
    };
}
