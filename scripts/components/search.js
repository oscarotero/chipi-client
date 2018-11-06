import { getNextFocusableElement } from '../utils/helpers.js';

export default class SearchForm extends HTMLFormElement {
    constructor() {
        super();

        this.input = this.querySelector('input[type="search"]');
        this.viewer = this.querySelector(':scope > div');
        this.complete = document.createElement('em');

        //Autocomplete
        this.input.addEventListener('input', () => {
            this.value = this.input.value;

            if (hasAutocomplete(this.input.value)) {
                this.autocomplete = 'foo';
            }
        });

        this.input.addEventListener('keydown', e => {
            switch (e.code) {
                //Autocomplete
                case 'Tab':
                    if (this.autocomplete) {
                        this.input.value += this.complete.innerHTML;
                        this.autocomplete = false;
                        e.preventDefault();
                    }
                    break;

                //Remove autocomplete/value
                case 'Escape':
                    if (this.autocomplete) {
                        this.autocomplete = false;
                    } else {
                        this.value = '';
                    }
                    e.preventDefault();
                    break;

                //Select results
                case 'ArrowDown':
                    let focusable = getNextFocusableElement(this);

                    if (focusable) {
                        focusable.focus();
                        return;
                    }
                    break;
            }
        });

        //Submit
        this.addEventListener('submit', () => (this.autocomplete = false));

        //Autofocus
        this.ownerDocument.addEventListener('keydown', event => {
            if (
                (event.code.startsWith('Key') || event.code === 'Backspace')
                && this.ownerDocument.activeElement !== this.input
            ) {
                this.input.focus();
            }
        })
        // this.ownerDocument.addEventListener('click', () => this.input.focus());
    }

    applyAutocomplete() {
        if (this.autocomplete) {
            this.input.value += this.complete.innerHTML + ' ';
            this.autocomplete = false;
        }
    }

    set value(value) {
        this.input.value = value;
        this.viewer.innerHTML = value
            .split(' ')
            .map(word => {
                if (word.includes(':')) {
                    return `<strong>${word}</strong>`;
                }

                return word;
            })
            .join(' ');
    }

    get value() {
        return this.input.value;
    }

    set autocomplete(value) {
        if (!value) {
            this.complete.innerHTML = '';

            if (this.complete.parentElement) {
                this.complete.remove();
            }
            return;
        }

        this.complete.innerHTML = value;
        this.viewer.append(this.complete);
    }

    get autocomplete() {
        return this.complete.innerHTML;
    }
}

function hasAutocomplete(value) {
    return value && !value.endsWith(' ');
}
