import { SUGGESTIONS_INIT } from '../actions/suggestions.js';
import { RESULTS_INIT } from '../actions/results.js';

import Suggestions from './suggestions.js';
import Results from './results.js';

export default class Container extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    connectedCallback() {
        this.unsubscribe = this.store.subscribe(() => this.update());
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    update() {
        const state = this.store.getState();

        switch (state.action) {
            case SUGGESTIONS_INIT:
                this.innerHTML = '';
                this.append(new Suggestions(this.store));
                break;

            case RESULTS_INIT:
                this.innerHTML = '';
                const results = new Results(this.store);
                this.append(results);
                break;
        }
    }
}

customElements.define('app-container', Container);
