import Element from './element.js';

/**
 * The element containing the whole aplication
 */
export default class App extends Element {
    subscribe() {
        this.update();
    }

    render(html, store) {
        return html`
            <div class="app-front">${renderFront(store, html)}</div>
            <div class="app-back"></div>
        `;
    }
}

customElements.define('chipi-app', App);

function renderFront(store, html) {
    const { user, search } = store.getState();

    if (!user) {
        return html`
            <chipi-welcome></chipi-welcome>
        `;
    }

    return html`
        <div class="app-header">
            <chipi-logo class="app-logo">Chipi</chipi-logo>
            <chipi-searchbox class="app-search"></chipi-searchbox>
            <chipi-session class="app-session"></chipi-session>
        </div>

        <div class="app-content">
            <div>${renderFlags(search.flags, html)} ${renderResults(search.results, html)}</div>

            ${renderPanels(search.panels, html)}
        </div>
    `;
}

function renderFlags(flags, html) {
    if (!flags.length) {
        return '';
    }

    return html`
        <nav class="flags">
            <strong class="flags-label">Available flags</strong>
            <ul is="chipi-navlist" class="flags-list is-horizontal">
                ${
                    flags.map(
                        flag =>
                            html`
                                <li><chipi-flag>${flag}</chipi-flag></li>
                            `
                    )
                }
            </ul>
        </nav>
    `;
}

function renderResults(results, html) {
    if (!results.length) {
        return '';
    }

    return html`
        <ul is="chipi-navlist" class="results">
            ${
                results.map(item => {
                    switch (item.type) {
                        case 'suggestion':
                            return html`
                                <li><button is="chipi-suggestion" .model="${item}"></button></li>
                            `;

                        case 'result':
                            return html`
                                <li><chipi-result .model="${item}"></chipi-result></li>
                            `;
                    }
                })
            }
        </ul>
    `;
}

function renderPanels(panels, html) {
    if (!panels.length) {
        return '';
    }

    return html`
        ${
            panels.map(panel => {
                switch (panel.type) {
                    default:
                        return html`
                            <chipi-panel> <chipi-detail .model="${panel}"></chipi-detail> </chipi-panel>
                        `;
                }
            })
        }
    `;
}
