import {click} from '../utils/helpers.js';

export default class SearchResult extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('mouseenter', () => this.focus());

        this.addEventListener('keydown', e => {
            if (e.code === 'ArrowRight') {
                click(this);
            }
        })
    }
}
