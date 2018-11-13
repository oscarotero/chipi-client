import { api, html } from '../utils/helpers.js';

export function suggestions(state = {}, action) {
    switch (action.type) {
        case 'SUGGESTIONS_FETCHED':
            return Object.assign({}, {suggestions: action.suggestions});
        
        default:
            return state;
    }
}

export class Suggestions extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    fetchSuggestions() {
        this.store.dispatch(suggestionsRequestAction());
        
        return api('suggestions')
            .then(data => this.store.dispatch(suggestionsFetchedAction(data)));
    }

    connectedCallback() {
        this.unsubscribe = this.store.subscribe(() => this.update());
        this.fetchSuggestions();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    update() {
        const state = this.store.getState();

        if (state.suggestions) {
            this.render(state.suggestions);
        }
    }

    render(suggestions) {
        this.innerHTML = 'Ola' + suggestions.length;
    }
}

customElements.define('app-suggestions', Suggestions);

function suggestionsRequestAction() {
    return {
        type: 'SUGGESTIONS_REQUEST'
    }
}

function suggestionsFetchedAction(suggestions) {
    return {
        type: 'SUGGESTIONS_FETCHED',
        suggestions
    }
}
