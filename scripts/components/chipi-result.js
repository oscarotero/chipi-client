import { click, onkeydown } from '../utils/helpers.js';

customElements.define(
    'chipi-result',
    class extends HTMLElement {
        constructor() {
            super();
            this.addEventListener('mouseenter', () => this.focus());

            onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
        }
    },
    { extends: 'article' }
);
