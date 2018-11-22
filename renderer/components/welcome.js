import { html } from '../utils/lit-html.js';
import { register } from '../utils/helpers.js';
import store from '../store.js';

export default class Welcome extends HTMLElement {
    connectedCallback() {
        this.unsubscribe = store.subscribe(() => {});
        this.update();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    render() {
        return html`
            <h1>Welcome Chipier</h1>
        `;
    }
}

register('chipi-welcome', Welcome);
