import { html } from '../utils/helpers.js';
import { fetchSuggestions } from '../utils/api.js';

import {
    suggestionsFetching,
    suggestionsLoaded
} from '../actions/suggestions.js';

import { resultsFetching } from '../actions/results.js';

export default class Suggestions extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    fetchSuggestions() {
        this.store.dispatch(suggestionsFetching());
        
        return fetchSuggestions()
            .then(data => this.store.dispatch(suggestionsLoaded(data)));
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

        if (state.suggestions && state.suggestions.length) {
            this.render(state.suggestions);
        }
    }

    render(suggestions) {
        this.innerHTML = '';

        const renderSuggestion = suggestion => {
            const element = html`<chipi-suggestion tabindex="0">${suggestion}</chipi-suggestion>`;
            element.addEventListener('click', () => this.store.dispatch(resultsFetching(suggestion)));
        
            return element;
        }

        this.append(html`
            <ul is="chipi-navlist" class="suggestions">
            ${suggestions.map(suggestion => html`<li>${renderSuggestion(suggestion)}</li>`)}
            </ul>`
        );
    }
}

customElements.define('app-suggestions', Suggestions);
