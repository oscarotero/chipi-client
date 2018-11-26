import Button from './button.js';

export default class Command extends Button {
    render(html) {
        const text = this.innerText;
        const code = this.dataset.command;

        return html`
            ${text} <code>${code}</code>
        `;
    }
}

customElements.define('chipi-command', Command, { extends: 'button' });
