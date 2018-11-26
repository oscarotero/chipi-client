import { html } from '../utils/lit-html.js';
import store from '../store.js';

/**
 * Element to display a welcome screen to non-logged users
 */
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

customElements.define('chipi-welcome', Welcome);
