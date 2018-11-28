const _ref = Symbol.for('_ref');
import { key } from '../utils/helpers.js';
import { popPanel } from '../actions/search.js';
import store from '../store.js';

/**
 * Generic element to display html in a lateral panel
 */
export class Panel extends HTMLElement {
    static get observedAttributes() {
        return ['size'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                overflow: hidden;
                position: relative;
            }
            :host > div {
                margin: 0 0 0 auto;
                max-width: 100%;
            }
        </style>
        <div>
            <slot></slot>
        </div>
    `;
        this.size = 3;

        this.addEventListener('click', e => {
            if (e.target === e.currentTarget) {
                this.destroy().then(() => store.dispatch(popPanel()));
            }
        });

        this.addEventListener(
            'keydown',
            key('ArrowLeft,Escape', e => {
                this.destroy().then(() => store.dispatch(popPanel()));
                e.stopPropagation();
            })
        );
    }

    connectedCallback() {
        const container = this.shadowRoot.querySelector('div');

        if (this.hasAttribute('ref')) {
            this.ref = this.ownerDocument.getElementById(this.getAttribute('ref'));
        }

        // requestAnimationFrame is needed due a chrome bug
        requestAnimationFrame(() => {
            container.animate({ transform: ['translateX(100%)', 'translateX(0%)'] }, 250);
            this.animate(
                { backgroundColor: ['transparent', 'rgba(0,0,0,0.15)'] },
                {
                    duration: 250,
                    fill: 'both'
                }
            );
        });
    }

    destroy() {
        const container = this.shadowRoot.querySelector('div');

        this.animate(
            { backgroundColor: ['rgba(0,0,0,0.15)', 'transparent'] },
            {
                duration: 250,
                fill: 'both'
            }
        );
        const animation = container.animate({ transform: ['translateX(0%)', 'translateX(100%)'] }, 250);

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

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    set size(unit) {
        if (unit < 1 || unit > 5) {
            throw new Error('Invalid size. Must be between 1-5');
        }

        const container = this.shadowRoot.querySelector('div');
        requestAnimationFrame(() => 
            container.style.maxWidth = ((this.offsetWidth / 5) * unit) + 'px'
        )
    }

    set ref(element) {
        this[_ref] = element;
    }

    get ref() {
        return this[_ref];
    }
}

customElements.define('chipi-panel', Panel);
