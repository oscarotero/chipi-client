import Element from './element.js';
import { login } from '../actions/user.js';

/**
 * Element to display a welcome screen to non-logged users
 */
export default class Welcome extends Element {
    connectedCallback() {
        super.connectedCallback();
        this.querySelector('button').focus();
    }

    render(html) {
        return html`
            <h1>Welcome to chipi</h1>
            <button @click="${() => this.store.dispatch(login())}">Login</button>
        `;
    }
}

customElements.define('chipi-welcome', Welcome);
