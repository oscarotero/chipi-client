import { html, onkeydown } from '../utils/helpers.js';
import { loadResults } from '../actions/results.js';
import { replaceQuery, appendQuery } from '../actions/query.js';
import { loadResult } from '../actions/panel.js';

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
            this.flags = state.results.flags;
            this.render();
        }
    }

    render() {
        this.innerHTML = '';

        if (!this.items.length) {
            return;
        }

        if (this.flags) {
            this.append(html`
                <nav class="flags">
                    <strong class="flags-label">Available flags</strong>
                    <ul is="chipi-navlist" class="flags-list is-horizontal">
                        ${
                            this.flags.map(
                                flag =>
                                    html`
                                        <li>${renderFlag(flag, this.store)}</li>
                                    `
                            )
                        }
                    </ul>
                </nav>
            `);
        }

        const results = html`
            <ul is="chipi-navlist" class="results">
            ${
                this.items.map(item => {
                    switch (item.type) {
                        case 'suggestion':
                        return html`
                        <li>${renderSuggestion(item, this.store)}</li>
                        `;
                        
                        case 'result':
                        return html`
                        <li>${renderResult(item, this.store)}</li>
                        `;
                    }
                })
            }
            </ul>
        `;

        this.append(results);

        //Escape
        onkeydown(['Escape', 'ArrowLeft'], results, () => this.store.dispatch(replaceQuery()));
    }
}

function renderSuggestion(data, store) {
    const element = html`
        <chipi-suggestion tabindex="0">${data.title}</chipi-suggestion>
    `;
    element.addEventListener('click', () => store.dispatch(replaceQuery(data.title)));

    return element;
}

function renderFlag(flag, store) {
    const element = html`
        <button is="chipi-flag">${flag}</button>
    `;
    element.addEventListener('click', () => store.dispatch(appendQuery(flag)));

    return element;
}

function renderResult(data, store) {
    const element = html`
        <article is="chipi-result" class="result is-list" tabindex="0" id="result-${data.id}">
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

    element.addEventListener('click', () => {
        element.classList.add('is-selected');
        store.dispatch(loadResult(data.id))
    });

    return element;
}

customElements.define('app-results', Results);
