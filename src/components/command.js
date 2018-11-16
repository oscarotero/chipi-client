import { onkeydown, click } from '../utils/helpers.js';

export default class Command extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener('mouseenter', () => this.focus());

        onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
    }

    connectedCallback() {
        const code = this.dataset.command;

        if (code) {
            this.innerHTML += ` <code>${code}</code>`;
        }
    }
}

customElements.define('chipi-command', Command, { extends: 'button' });
