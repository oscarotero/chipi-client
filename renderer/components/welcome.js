import Element from './element.js';
import { login } from '../actions/user.js';

/**
 * Element to display a welcome screen to non-logged users
 */
export default class Welcome extends Element {
    render(html, store) {
        return html`
            <h1>Welcome Chipier</h1>
            <button @click="${() => store.dispatch(login())}">Login</button>
        `;
    }
}

customElements.define('chipi-welcome', Welcome);
