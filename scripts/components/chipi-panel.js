customElements.define(
    'chipi-panel',
    class extends HTMLElement {
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
                }
                :host > div {
                    margin: 0 0 0 auto;
                }
            </style>
            <div>
                <slot></slot>
            </div>
        `;
            this.size = 2;
        }

        connectedCallback() {
            const container = this.shadowRoot.querySelector('div');

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
            container.style.maxWidth = unit * 20 + '%';
        }
    }
);