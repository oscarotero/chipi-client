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
            <chipi-full-logo></chipi-full-logo>
            <h1>Ready? Let’s roll!</h1>
            <button @click="${() => this.store.dispatch(login())}">
                <img src="img/logo/google.svg">
                <span>Sign in with Google</span>
            </button>
            <small>or press ENTER</small>
        `;
    }
}

customElements.define('chipi-welcome', Welcome);
