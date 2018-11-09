import { click } from '../utils/helpers.js';

customElements.define(
    'chipi-result',
    class extends HTMLElement {
        constructor() {
            super();
            this.addEventListener('mouseenter', () => this.focus());

            this.addEventListener('keydown', e => {
                if (e.code === 'Enter' || e.code === 'ArrowRight') {
                    click(this);
                }
            });
        }
    },
    { extends: 'article' }
);
