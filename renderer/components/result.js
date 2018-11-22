import { click, onkeydown } from '../utils/helpers.js';

export default class Result extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('mouseenter', () => this.focus());

        onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
    }
}

customElements.define('chipi-result', Result, { extends: 'article' });
