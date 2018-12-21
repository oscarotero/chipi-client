import { key } from '../utils/helpers.js';

/**
 * Generic element to view html in a dialog
 */
export class Viewer extends HTMLDialogElement {
    constructor() {
        super();

        const close = document.createElement('button');
        close.innerText = 'Close';

        this.prepend(close);

        close.addEventListener('click', () => this.destroy());

        this.addEventListener(
            'keydown',
            key('Escape', e => {
                this.destroy();
                e.stopPropagation();
            })
        );
    }
    connectedCallback() {
        const animation = this.animate(
            { transform: ['scale(0)', 'scale(1)'] },
            {
                duration: 250,
                fill: 'both'
            }
        );

        animation.onfinish = () => this.focus();
    }

    destroy() {
        const animation = this.animate(
            { transform: ['scale(1)', 'scale(0)'] },
            {
                duration: 250,
                fill: 'both'
            }
        );

        return new Promise(resolve => {
            animation.onfinish = () => {
                this.remove();

                if (this.ref) {
                    this.ref.focus();
                }

                resolve();
            };
        });
    }
}

customElements.define('chipi-viewer', Viewer, { extends: 'dialog' });
