import {replaceQuery} from '../actions/query.js';

export default class Header extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    connectedCallback() {
        this.innerHTML = `
            <chipi-logo state=":p" class="app-logo" id="chipi-logo">Chipi</chipi-logo>

            <form class="app-search searchbox" is="chipi-search" id="search-form">
                <input type="search" placeholder="Hi, Paula. What are you looking for?" class="searchbox-input" autofocus>
                <div class="searchbox-render"></div>
                <button type="submit" class="searchbox-submit"></button>
            </form>

            <nav class="app-session session">
                <img src="img/avatar/005.jpg" class="session-avatar">
            </nav>
        `;

        const logo = this.querySelector('#chipi-logo');
        const search = this.querySelector('#search-form');

        search.addEventListener('submit', event => {
            event.preventDefault();
            store.dispatch(replaceQuery(search.value));
        })
        
        this.store.subscribe(() => {
            const state = this.store.getState();
        
            search.value = state.query || '';
            logo.state = state.action.endsWith('_LOADING') ? 'searching' : ':p';
        })
    }
}

customElements.define('app-header', Header, { extends: 'header' });
