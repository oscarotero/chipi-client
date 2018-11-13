import { html } from '../utils/helpers.js';
import { fetchResults } from '../utils/api.js';

import {
    resultsFetching,
    resultsLoaded
} from '../actions/results.js';

export default class Results extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    fetchResults(query) {
        this.store.dispatch(resultsFetching(query));
        
        return fetchResults(query)
            .then(data => this.store.dispatch(resultsLoaded(data)));
    }

    connectedCallback() {
        this.unsubscribe = this.store.subscribe(() => this.update());
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    update() {
        const state = this.store.getState();

        if (state.results && state.results.length) {
            this.render(state.results);
        }
    }

    render(results) {
        this.innerHTML = '';

        const renderResult = result => {
            const element = html`<chipi-suggestion tabindex="0">${result}</chipi-suggestion>`;
        
            return element;
        }

        this.append(html`
            <ul is="chipi-navlist" class="results">
            ${results.map(result => html`<li>${renderResult(result)}</li>`)}
            </ul>`
        );
    }
}

customElements.define('app-results', Results);
