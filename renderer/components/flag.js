import Element from './element.js';
import { appendQuery, loadResults } from '../actions/search.js';

export default class Flag extends Element {
    render(html) {
        const text = this.innerText;

        return html`
            <button @click="${() => {
                this.store.dispatch(appendQuery(text));
                this.store.dispatch(loadResults());
            }}">${text}</button>
        `;
    }
}

customElements.define('chipi-flag', Flag);
