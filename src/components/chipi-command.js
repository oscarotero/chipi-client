import { onkeydown } from '../utils/helpers.js';

customElements.define(
    'chipi-command',
    class extends HTMLButtonElement {
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
    },
    { extends: 'button' }
);
