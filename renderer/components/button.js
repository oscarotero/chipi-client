import { click, key } from '../utils/helpers.js';
import { html, render } from '../utils/lit-html.js';
import store from '../store.js';

const _unsubscribe = Symbol.for('_unsubscribe');
const _model = Symbol.for('_model');

/**
 * Base default class extended by other custom elements
 */
export default class Button extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('mouseenter', () => this.focus());
        this.addEventListener('keydown', key(['Enter', 'ArrowRight'], () => click(this)));
    }

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
        if (this.isConnected) {
            render(this.render(html, store), this);
        }
    }

    render() {
        console.log(this);
        throw new Error('No render function defined');
    }

    set model(model) {
        this[_model] = model;
    }

    get model() {
        return this[_model] || {};
    }
}
