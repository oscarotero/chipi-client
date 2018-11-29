const _state = Symbol.for('state');
import Element from './element.js';

export default class FullLogo extends Element {
    static get availableStates() {
        return {
            '': [
                {
                    pixels: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]
                }
            ],
            chipi: [
                {
                    pixels: [
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                        0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0,
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ],
                },
                {
                    pixels: [
                        0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
                        1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0,
                        0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0,
                        0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ],
                },
                {
                    pixels: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ],
                },
                {
                    pixels: [
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
                        1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
                        1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0
                    ]
                },
            ]
        };
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this[_state] = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this.state = 'chipi';
    }

    render() {
        const size = 80;
        const height = size;
        const width = size * 3;
        const step = size / 5;

        const svg = createNode('svg', {
            width,
            height,
            viewbox: `0 0 ${width} ${height}`
        });

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
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

        const style = document.createElement('style');
        style.innerText = `
        rect {
            animation: color 4s;
            animation-delay: 1s;
            animation-fill-mode: both;
            animation-timing-function: linear;
        }
        @keyframes color {
            from {
                fill: #2266EE;
            }
            to {
                fill: black;
            }
        }
        `;

        return [svg, style];
    }

    set state(name) {
        if (name === this.state) {
            return;
        }

        const newDraw = FullLogo.availableStates[name].slice();
        const pixels = this.shadowRoot.firstElementChild.children;

        renderFrame(newDraw.shift());

        function renderFrame(frame, prev = []) {
            frame.pixels.forEach((value, index) => {
                const pixel = pixels[index];
                
                pixel.animate(
                    [
                        {
                            opacity: prev[index] || 0
                        },
                        {
                            opacity: value
                        }
                    ],
                    Object.assign(
                        {
                            duration: 800,
                            easing: 'ease',
                            fill: 'both',
                            iterations: 1
                        },
                        frame.options
                    )
                );
            });

            if (newDraw.length) {
                setTimeout(() => renderFrame(newDraw.shift(), frame.pixels), 800);
            }
        }

        this[_state] = name;
    }

    get state() {
        return this[_state];
    }
}

customElements.define('chipi-full-logo', FullLogo);

function createNode(name, properties = {}) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', name);

    Object.keys(properties).forEach(name => {
        node.setAttributeNS(null, name, properties[name]);
    });

    return node;
}
