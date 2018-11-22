import { html } from '../utils/lit-html.js';
import { register } from '../utils/helpers.js';
import store from '../store.js';

export default class Search extends HTMLElement {
    connectedCallback() {
        this.unsubscribe = store.subscribe(() => {});
        this.update();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    render() {
        return html`
            <header is="chipi-header" class="app-header">
                <chipi-logo state=":p" class="app-logo" id="chipi-logo">Chipi</chipi-logo>

                <form class="app-search searchbox" is="chipi-searchbox" id="search-form">
                    <input
                        type="search"
                        placeholder="Hi, Paula. What are you looking for?"
                        class="searchbox-input"
                        autofocus
                    />
                    <div class="searchbox-render"></div>
                    <button type="submit" class="searchbox-submit"></button>
                </form>

                <nav class="app-session session"><img src="img/avatar/005.jpg" class="session-avatar" /></nav>
            </header>
            <chipi-container class="app-content"></chipi-container>
        `;
    }
}

register('chipi-search', Search);
