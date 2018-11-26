import Element from './element.js';

/**
 * Element to display the session status
 */
export default class Session extends Element {
    render(html, store) {
        const { user } = store.getState();

        return html`
            <img src="${user.avatar}" alt="${user.name}" />
        `;
    }
}

customElements.define('chipi-session', Session);
