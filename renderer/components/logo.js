const _state = Symbol.for('state');
import Element from './element.js';

export default class Logo extends Element {
    static get availableStates() {
        return {
            '': {
                pixels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            ':p': {
                pixels: [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0]
            },

            ':(': {
                pixels: [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0]
            },

            ':D': {
                pixels: [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0]
            },

            ':o': {
                pixels: [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]
            },

            loading: {
                options: {
                    iterations: Infinity,
                    duration: 25 * 25
                },
                pixels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        };
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this[_state] = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this.state = ':p';
    }

    subscribe() {
        const state = this.store.getState();
        this.state = state.action.endsWith('_LOADING') ? 'loading' : ':p';
    }

    render() {
        const size = 40;
        const step = size / 5;

        const svg = createNode('svg', {
            width: size,
            height: size,
            viewbox: `0 0 ${size} ${size}`
        });

        for (let y = 0; y < size; y += step) {
            for (let x = 0; x < size; x += step) {
                const cell = createNode('rect', {
                    width: step,
                    height: step,
                    x: x,
                    y: y,
                    fill: 'currentColor',
                    opacity: 0
                });
                svg.appendChild(cell);
            }
        }

        return svg;
    }

    set state(name) {
        if (name === this.state) {
            return;
        }

        const newDraw = Logo.availableStates[name];
        const prevDraw = Logo.availableStates[this[_state]].pixels;
        const pixels = this.shadowRoot.firstElementChild.children;

        newDraw.pixels.forEach((value, index) => {
            const pixel = pixels[index];

            pixel.animate(
                [
                    {
                        opacity: prevDraw[index]
                    },
                    {
                        opacity: 1,
                        offset: 0.1
                    },
                    {
                        opacity: value
                    }
                ],
                Object.assign(
                    {
                        duration: 400,
                        delay: index * 25,
                        easing: 'ease',
                        fill: 'both',
                        iterations: 1
                    },
                    newDraw.options
                )
            );
        });

        this[_state] = name;
    }

    get state() {
        return this[_state];
    }
}

customElements.define('chipi-logo', Logo);

function createNode(name, properties = {}) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', name);

    Object.keys(properties).forEach(name => {
        node.setAttributeNS(null, name, properties[name]);
    });

    return node;
}
