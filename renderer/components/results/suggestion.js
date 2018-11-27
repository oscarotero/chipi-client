import Button from '../button.js';
import {replaceQuery} from '../../actions/search.js';
import store from '../../store.js';

export default class Suggestion extends Button {
    constructor() {
        super();
        this.addEventListener('click', () => store.dispatch(replaceQuery(this.model.title)))
    }

    render(html) {
        return html`
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,19 L13,13" stroke-linecap="round"></path>
                <circle cx="8" cy="8" r="7"></circle>
            </svg>

            ${this.model.title}
        `;
    }
}

customElements.define('chipi-suggestion', Suggestion, {extends: 'button'});
