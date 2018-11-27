import { html, render } from '../utils/lit-html.js';
import store from '../store.js';

const _unsubscribe = Symbol.for('_unsubscribe');
const _model = Symbol.for('_model');

/**
 * Base default class extended by other custom elements
 */
export default class Element extends HTMLElement {
    constructor() {
        super();
        this.store = store;
    }

    connectedCallback() {
        if (this.subscribe) {
            this[_unsubscribe] = this.store.subscribe(() => this.subscribe());
        }

        this.update();
    }

    disconnectedCallback() {
        if (this[_unsubscribe]) {
            this[_unsubscribe]();
        }
    }

    update() {
        if (this.isConnected) {
            render(this.render(html), this.shadowRoot || this);
        }
    }

    render() {
        throw new Error('No render function defined');
    }

    set model(model) {
        this[_model] = model;
        this.update();
    }

    get model() {
        return this[_model] || {};
    }
}
