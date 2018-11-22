import { onkeydown } from '../utils/helpers.js';
import { replaceQuery } from '../actions/query.js';
import store from '../store.js';
export default class Header extends HTMLElement {
    connectedCallback() {
        const search = this.querySelector('#search-form');

        search.addEventListener('submit', event => {
            event.preventDefault();
            store.dispatch(replaceQuery(search.value));
        });

        onkeydown('Escape', search.input, event => {
            if (!search.value) {
                store.dispatch(replaceQuery());
            }
        });

        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();

            search.value = state.query || '';

            if (state.action === 'RESULTS_LOADED') {
                search.focus();
            }
        });
    }

    disconnectedCallback() {
        this.unsubscribe();
    }
}

customElements.define('chipi-header', Header, { extends: 'header' });
