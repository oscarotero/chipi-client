import { html } from '../utils/lit-html.js';
import { click, onkeydown } from '../utils/helpers.js';
import { register } from '../utils/helpers.js';

export default class Suggestion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.update();

        this.addEventListener('mouseenter', () => this.focus());
        onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
    }

    render() {
        return html`
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    cursor: default;
                    padding: 0 15px;
                }

                svg {
                    flex: 0 0 20px;
                    margin-right: 15px;
                    opacity: var(--icon-opacity, 0.35);
                }
                path,
                circle {
                    stroke-width: 2px;
                    stroke: currentColor;
                    fill: none;
                }
            </style>

            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,19 L13,13" stroke-linecap="round"></path>
                <circle cx="8" cy="8" r="7"></circle>
            </svg>

            <slot></slot>
        `;
    }
}

register('chipi-suggestion', Suggestion);
