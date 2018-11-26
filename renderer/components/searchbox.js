import Element from './element.js';
import { focus, key } from '../utils/helpers.js';
import { replaceQuery, loadSuggestions } from '../actions/search.js';

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
        const state = store.getState();

        if ('query' in state.search) {
            this.value = state.search.query;
        }

        if (state.action.startsWith('PANEL_POP') || state.action === 'RESULTS_LOADED') {
            console.log('focus');
            this.focus();
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
                    @keydown="${
                        key({
                            //Autocomplete
                            Tab: e => {
                                if (this.autocomplete) {
                                    this.value += this.autocomplete;
                                    this.autocomplete = false;
                                    e.preventDefault();
                                }
                            },

                            //Remove autocomplete/value
                            Escape: e => {
                                if (this.autocomplete) {
                                    this.autocomplete = false;
                                } else {
                                    this.value = '';
                                    store.dispatch(loadSuggestions());
                                }
                                e.preventDefault();
                            },

                            //Focus bottom element
                            ArrowDown: e => focus(e.target, 1),

                            //Focus top element
                            ArrowUp: e => focus(e.target, -1)
                        })
                    }"
                    @input="${
                        e => {
                            this.value = e.target.value;
                            this.autocomplete = 'design';
                        }
                    }"
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
