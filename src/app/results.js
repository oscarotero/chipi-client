import { html } from '../utils/helpers.js';

import { loadResults } from '../actions/results.js';

export default class Results extends HTMLElement {
    constructor(store) {
        super();
        this.store = store;
    }

    connectedCallback() {
        this.unsubscribe = this.store.subscribe(() => this.update());
        this.store.dispatch(loadResults());
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    update() {
        const state = this.store.getState();

        if (state.results.items !== this.items) {
            this.items = state.results.items;
            this.render();
        }
    }

    render() {
        this.innerHTML = '';

        if (!this.items.length) {
            return;
        }

        this.append(html`
            <ul is="chipi-navlist" class="results">
                ${
                    this.items.map(item => {
                        switch (item.type) {
                            case 'suggestion':
                                return html`
                                    <li>${renderSuggestion(item)}</li>
                                `;

                            case 'result':
                                return html`
                                    <li>${renderResult(item)}</li>
                                `;
                        }
                    })
                }
            </ul>
        `);
    }
}

function renderSuggestion(data) {
    const element = html`
        <chipi-suggestion tabindex="0">${data.title}</chipi-suggestion>
    `;
    // element.addEventListener('click', () => this.store.dispatch(loadResults(suggestion)));

    return element;
}

function renderResult(data) {
    const element = html`
        <article is="chipi-result" class="result is-list" tabindex="0">
            <div class="result-service avatar">
                <img src="img/avatar/${data.from.avatar}.jpg" class="avatar-user" />
                <img src="img/logo/${data.channel.type}.svg" class="avatar-service" />
            </div>
            <nav class="result-location">
                <ul>
                    ${data.channel.location.map(val => `<li><button>${val}</button></li>`)}
                </ul>
            </nav>
            <h2 class="result-title" title="${data.title}">${data.title}</h2>
            <time class="result-time">${new Date(data.time * 1000).toDateString()}</time>
            <p class="result-description">${data.excerpt}</p>
        </article>
    `;

    // element.addEventListener('click', () => app.go('details', element, data));
    return element;
}

customElements.define('app-results', Results);
