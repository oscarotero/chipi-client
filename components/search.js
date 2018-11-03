export default class Search {
    constructor(form, results) {
        this.form = form;
        this.results = results;

        this.input = form.querySelector('input[type="search"]');
        this.viewer = form.querySelector(':scope > div');
        this.complete = document.createElement('em');

        this.input.addEventListener('input', () => {
            this.viewer.innerHTML = this.input.value;

            const word = getWord(this.input.value);

            if (word) {
                this.autocomplete = 'foo ';
            }
        });

        this.input.addEventListener('keydown', e => {
            switch (event.code) {
                //Autocomplete
                case 'Enter':
                case 'Tab':
                    if (this.autocomplete) {
                        this.input.value += this.complete.innerHTML;
                        this.autocomplete = false;
                        e.preventDefault();
                    }
                    break;
                
                //Select results
                case 'ArrowDown':
                    this.results.querySelector('[tabindex]').focus();
                    break;
            }
        });

        //Emulate show results
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const template = document.getElementById('tpl-result');
            const list = this.results.querySelector('ul');
            list.innerHTML = '';
            list.append(document.importNode(template.content, true));
        });

        //Autofocus
        document.addEventListener('keydown', e => {
            if (e.code.startsWith('Key') && document.activeElement !== this.input) {
                this.input.focus();
            }
        })
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

function getWord(value) {
    if (value.endsWith(' ')) {
        return null;
    }

    const match = value.match(/\s([^\s]+)$/);
    return match ? match[1] : null;
}