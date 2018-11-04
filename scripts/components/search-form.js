import { getNextFocusableElement } from '../utils.js';

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
                
                //Remove autocomplete
                case 'Escape':
                    this.autocomplete = false;
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

        //Autofocus
        document.addEventListener('keydown', e => {
            if (e.code.startsWith('Key') && document.activeElement !== this.input) {
                this.input.focus();
            }
        })

        //Submit
        this.addEventListener('submit', () => this.autocomplete = false);
    }

    applyAutocomplete() {
        if (this.autocomplete) {
            this.input.value += this.complete.innerHTML + ' ';
            this.autocomplete = false;
        }
    }

    set value(value) {
        this.input.value = value;
        this.viewer.innerHTML = value.split(' ')
            .map(word => {
                if (word.includes(':')) {
                    return `<strong>${word}</strong>`;
                }

                return word;
            })
            .join(' ');
    }

    get value() {
        return this.input;
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