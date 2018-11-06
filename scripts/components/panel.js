export default class Panel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    overflow: hidden;
                    animation-name: showBackground;
                    animation-duration: 250ms;
                    animation-fill-mode: both;
                }
                :host > div {
                    flex-grow: 1;
                    margin: 0 0 0 auto;
                    animation-name: showContainer;
                    animation-duration: 250ms;
                    animation-fill-mode: both;
                    transition: max-width;
                    transition-duration: 250ms;
                }

                @keyframes showBackground {
                    from {
                        background-color: rgba(0,0,0,0);
                    }
                    to {
                        background-color: rgba(0,0,0,0.2);
                    }
                }
                @keyframes hideBackground {
                    from {
                        background-color: rgba(0,0,0,0.2);
                    }
                    to {
                        background-color: rgba(0,0,0,0);
                    }
                }
                @keyframes showContainer {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes hideContainer {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            </style>
            <div>
                <slot></slot>
            </div>
        `;
        this.size = 2;
    }

    destroy() {
        this.style.animationName = 'hideBackground';
        this.shadowRoot.querySelector('div').style.animationName =
            'hideContainer';

        return new Promise(resolve => {
            this.addEventListener('animationend', () => {
                this.remove();
                resolve();
            });
        });
    }

    set size(unit) {
        if (unit < 1 || unit > 5) {
            throw new Error('Invalid size. Must be between 1-5');
        }

        const container = this.shadowRoot.querySelector('div');
        container.style.maxWidth = unit * 20 + '%';
    }
}
