import { click, onkeydown } from '../../utils/helpers.js';
import Element from '../element.js';
import {replaceQuery} from '../../actions/search.js';

export default class Suggestion extends Element {
    constructor() {
        super();

        onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
    }

    render(html, store) {
        const model = this.model;

        return html`
            <button
                @mouseenter=${e => e.currentTarget.focus()}
                @click=${() => store.dispatch(replaceQuery(model.title))}
                >
                <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19,19 L13,13" stroke-linecap="round"></path>
                    <circle cx="8" cy="8" r="7"></circle>
                </svg>

                ${model.title}
            </button>
        `;
    }
}

customElements.define('chipi-suggestion', Suggestion);
