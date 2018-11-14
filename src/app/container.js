import Results from './results.js';

export default class Container extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    connectedCallback() {
        this.append(new Results(this.store));
    }
}

customElements.define('app-container', Container);
