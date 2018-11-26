import { html, render } from '../utils/lit-html.js';
import store from '../store.js';

const _unsubscribe = Symbol.for('_unsubscribe');
const _model = Symbol.for('_model');

/**
 * Base default class extended by other custom elements
 */
export default class Element extends HTMLElement {
    connectedCallback() {
        if (this.subscribe) {
            this[_unsubscribe] = store.subscribe(() => this.subscribe(store));
        }

        this.update();
    }

    disconnectedCallback() {
        if (this[_unsubscribe]) {
            this[_unsubscribe]();
        }
    }

    update() {
        render(this.render(html, store), this.shadowRoot || this);
    }

    render(html, store) {
        return html``;
    }

    set model(model) {
        this[_model] = model;
        this.update();
    }

    get model() {
        return this[_model] || {};
    }
}
