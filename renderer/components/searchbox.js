import Element from './element.js';
import { focus } from '../utils/helpers.js';
import { replaceQuery } from '../actions/search.js';

/**
 * Chipi searchbox, with flags and autocomplete
 */
export default class Searchbox extends Element {
    constructor() {
        super();

        //Autofocus
        this.ownerDocument.addEventListener('keydown', event => {
            if (
                (event.code.startsWith('Key') || event.code === 'Backspace') &&
                this.ownerDocument.activeElement !== this.input &&
                !event.metaKey &&
                !event.ctrlKey
            ) {
                this.focus();
            }
        });
    }

    focus() {
        this.querySelector('.searchbox-input').focus();
    }

    subscribe(store) {
        const { search } = store.getState();

        if ('query' in search) {
            this.value = search.query;
        }
    }

    set autocomplete(value) {
        const em = this.querySelector('em');

        if (!value) {
            if (em) {
                em.remove();
            }
            return;
        }

        const word = this.currentWord;

        if (!word || !value.startsWith(word)) {
            return;
        }

        value = value.slice(word.length);

        if (em) {
            em.innerText = value;
        } else {
            this.querySelector('.searchbox-render').innerHTML += `<em>${value}</em>`;
        }
    }

    get autocomplete() {
        const em = this.querySelector('em');

        if (em) {
            return em.innerText;
        }
    }

    get currentWord() {
        const value = this.value;

        if (!value || value.endsWith(' ')) {
            return '';
        }

        if (!value.includes(' ')) {
            return value;
        }

        return value.split(' ').pop();
    }

    set value(value) {
        this.querySelector('.searchbox-input').value = value;
        this.querySelector('.searchbox-render').innerHTML = value
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
        return this.querySelector('.searchbox-input').value;
    }

    render(html, store) {
        const { search, user } = store.getState();

        return html`
            <form
                class="searchbox"
                @submit="${
                    e => {
                        e.preventDefault();
                        this.autocomplete = false;
                        store.dispatch(replaceQuery(e.target['q'].value));
                    }
                }"
            >
                <input
                    type="search"
                    placeholder="Hi, ${user.name}. What are you looking for?"
                    class="searchbox-input js-focus"
                    value="${search.query}"
                    name="q"
                    autofocus
                    autocomplete="off"
                    @keydown="${e => keydown(e, this)}"
                    @input="${e => input(e, this)}"
                />
                <div class="searchbox-render">
                    ${
                        search.query.split(' ').map(word => {
                            if (word.includes(':')) {
                                return html`
                                    <strong>${word}</strong>
                                `;
                            }

                            return word;
                        })
                    }
                </div>
                <button type="submit" class="searchbox-submit"></button>
            </form>
        `;
    }
}

customElements.define('chipi-searchbox', Searchbox);

function input(e, element) {
    element.value = e.target.value;
    element.autocomplete = 'design';
}

function keydown(e, element) {
    switch (e.code) {
        //Autocomplete
        case 'Tab':
            if (element.autocomplete) {
                element.value += element.autocomplete;
                element.autocomplete = false;
                e.preventDefault();
            }
            break;

        //Remove autocomplete/value
        case 'Escape':
            if (element.autocomplete) {
                element.autocomplete = false;
            } else {
                element.value = '';
            }
            e.preventDefault();
            break;

        //Focus bottom element
        case 'ArrowDown':
            focus(e.target, 1);
            break;

        //Focus top element
        case 'ArrowUp':
            focus(e.target, -1);
            break;
    }
}
