import Element from './element.js';
import { focus } from '../utils/helpers.js';

const _back = Symbol.for('_back');

/**
 * The element containing the whole aplication
 */
export default class App extends Element {
    /**
     * Update the component on change the state
     */
    subscribe() {
        this.update();
    }

    /**
     * Display the login to unlogged users
     */
    update() {
        super.update();

        if (!this.store.getState().user) {
            this.back = true;
        }
    }

    render(html) {
        return html`
            <div class="app-front">${renderFront(this.store, html, this)}</div>
            <div class="app-back">${renderBack(this.store, html, this)}</div>
        `;
    }

    set back(value) {
        if (value) {
            this.toBack(false);
        } else {
            this.toFront(false);
        }
    }

    get back() {
        return this[_back] || false;
    }

    /**
     * Flip to back
     */
    toBack(animate = true) {
        if (this.back) {
            return Promise.resolve();
        }

        this[_back] = true;

        return flip(this, true, animate);
    }

    /**
     * Flip to front
     */
    toFront(animate = true) {
        if (!this.back) {
            return Promise.resolve();
        }

        this[_back] = false;

        return flip(this, false, animate);
    }
}

customElements.define('chipi-app', App);

function flip(element, toBack = false, animate = true) {
    const front = element.querySelector('.app-front');
    const back = element.querySelector('.app-back');
    const options = {
        duration: animate ? 600 : 0,
        easing: 'ease-in-out',
        fill: 'both'
    };

    let frontProperties, backProperties;

    if (toBack) {
        frontProperties = {
            transform: ['rotateY(0)', 'rotateY(-180deg)']
        };
        backProperties = {
            transform: ['rotateY(180deg)', 'rotateY(0)'],
            opacity: [0, 0, 1]
        };
    } else {
        frontProperties = {
            transform: ['rotateY(-180deg)', 'rotateY(0)']
        };
        backProperties = {
            transform: ['rotateY(0)', 'rotateY(180deg)'],
            opacity: [1, 1, 0]
        };
    }
    front.hidden = false;
    back.hidden = false;
    front.animate(frontProperties, options);
    const anim = back.animate(backProperties, options);

    return new Promise(resolve => {
        anim.onfinish = () => {
            if (toBack) {
                front.hidden = true;
                focus(back);
            } else {
                back.hidden = true;
                focus(front);
            }
            resolve();
        };
    });
}

function renderFront(store, html, app) {
    const { user, search } = store.getState();

    //If the user is no logged, display the welcome screen
    if (!user) {
        return;
    }

    return html`
        <div class="app-header">
            <chipi-logo class="app-logo">Chipi</chipi-logo>
            <chipi-searchbox class="app-search"></chipi-searchbox>
            <chipi-session class="app-session" @click="${() => app.toBack()}"></chipi-session>
        </div>

        <div class="app-content">
            <div>${renderFlags(search, html)} ${renderResults(search, html)}</div>

            ${renderPanels(search, html)}
        </div>
    `;
}

function renderBack(store, html, app) {
    const { user, search } = store.getState();

    //If the user is no logged, display the welcome screen
    if (!user) {
        return html`
            <chipi-welcome></chipi-welcome>
        `;
    }

    return html`
        <chipi-settings>Chipi settings, connections, etc <button @click="${() => app.toFront()}">Save</button></chipi-settings>
    `;
}

function renderFlags(search, html) {
    if (!search.flags.length) {
        return '';
    }

    return html`
        <nav class="flags">
            <strong class="flags-label">Available flags</strong>
            <ul is="chipi-navlist" class="flags-list is-horizontal" .disabled="${search.panels.length > 0}">
                ${
                    search.flags.map(
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

function renderResults(search, html) {
    if (!search.results.length) {
        return '';
    }

    return html`
        <ul is="chipi-navlist" class="results" .disabled="${search.panels.length > 0}">
            ${
                search.results.map(item => {
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

function renderPanels(search, html) {
    if (!search.panels.length) {
        return '';
    }

    return html`
        ${
            search.panels.map(panel => {
                switch (panel.type) {
                    default:
                        return html`
                            <chipi-panel ref="${'item-' + panel.id}">
                                ${renderDetail(html, panel)}
                            </chipi-panel>
                        `;
                }
            })
        }
    `;
}

function renderDetail(html, panel) {
    switch (panel.channel.type) {
        case 'slack':
            return html`<chipi-detail-slack .model="${panel}"></chipi-detail-slack>`;
        case 'gmail':
            return html`<chipi-detail-gmail .model="${panel}"></chipi-detail-gmail>`;
        case 'trello':
            return html`<chipi-detail-trello .model="${panel}"></chipi-detail-trello>`;
    }
}