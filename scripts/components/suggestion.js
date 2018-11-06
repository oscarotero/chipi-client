import { click } from '../utils/helpers.js';

export default class SearchSuggestion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
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
                fill: currentColor;
                opacity: var(--icon-opacity, .35);
            }
        </style>

        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3199492,12.9057357 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3165825,20.0976311 18.6834175,20.0976311 18.2928932,19.7071068 L12.9057371,14.3199507 C11.5201287,15.3973816 9.80683586,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,9.80679478 15.3974149,11.5200824 14.3199492,12.9057357 Z M8,14 C9.60224207,14 11.102618,13.370369 12.2191676,12.2659855 C12.2444361,12.240894 12.2444361,12.240894 12.2695066,12.2156048 C13.3717509,11.0993689 14,9.60049614 14,8 C14,4.6862915 11.3137085,2 8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 Z"></path>
        </svg>

        <slot></slot>
        `;
        this.addEventListener('mouseenter', () => this.focus());

        this.addEventListener('keydown', e => {
            if (e.code === 'Enter') {
                click(this);
            }
        });
    }

    get value() {
        return this.innerHTML;
    }
}
