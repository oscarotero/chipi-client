customElements.define(
    'chipi-search',
    class extends HTMLFormElement {
        constructor() {
            super();

            this.input = this.querySelector('input[type="search"]');
            this.viewer = this.querySelector(':scope > div');
            this.complete = document.createElement('em');

            //Autocomplete
            this.input.addEventListener('input', () => {
                this.value = this.input.value;
                this.autocomplete = 'design';
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

                    //Focus bottom element
                    case 'ArrowDown':
                        if (this.bottomFocusableElement) {
                            this.bottomFocusableElement.focus();
                        }
                        break;

                    //Focus top element
                    case 'ArrowUp':
                        if (this.topFocusableElement) {
                            this.topFocusableElement.focus();
                        }
                        break;
                }
            });

            //Submit
            this.addEventListener('submit', () => (this.autocomplete = false));

            //Autofocus
            this.ownerDocument.addEventListener('keydown', event => {
                if (
                    (event.code.startsWith('Key') || event.code === 'Backspace') &&
                    this.ownerDocument.activeElement !== this.input &&
                    !event.metaKey &&
                    !event.ctrlKey
                ) {
                    this.input.focus();
                }
            });
        }

        applyAutocomplete() {
            if (this.autocomplete) {
                this.input.value += this.complete.innerHTML + ' ';
                this.autocomplete = false;
            }
        }

        focus() {
            this.input.focus();
        }

        get currentWord() {
            const value = this.input.value;

            if (!value || value.endsWith(' ')) {
                return '';
            }

            if (!value.includes(' ')) {
                return value;
            }

            return value.split(' ').pop();
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

            const word = this.currentWord;

            if (!word || !value.startsWith(word)) {
                return;
            }

            value = value.slice(word.length);

            this.complete.innerHTML = value;
            this.viewer.append(this.complete);
        }

        get autocomplete() {
            return this.complete.innerHTML;
        }
    },
    { extends: 'form' }
);
