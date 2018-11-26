import Element from './element.js';
import { appendQuery } from '../actions/search.js';

export default class Flag extends Element {
    render(html, store) {
        const text = this.innerText;

        return html`
            <button @click="${() => store.dispatch(appendQuery(text))}">${text}</button>
        `;
    }
}

customElements.define('chipi-flag', Flag);
