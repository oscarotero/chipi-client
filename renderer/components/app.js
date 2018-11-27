import Element from './element.js';
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

        if (animate) {
            return flip(this, true);
        }

        flip(this, true, false);
    }

    /**
     * Flip to front
     */
    toFront(animate = true) {
        if (!this.back) {
            return Promise.resolve();
        }

        this[_back] = false;

        if (animate) {
            return flip(this);
        }

        flip(this, false, false);
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
    
    front.animate(frontProperties, options);
    const anim = back.animate(backProperties, options);

    return new Promise(resolve => {
        anim.onfinish = () => resolve();
    })
}

function renderFront(store, html, app) {
    const { user, search } = store.getState();

    //If the user is no logged, display the welcome screen
    if (!user) {
        return
    }

    return html`
        <div class="app-header">
            <chipi-logo class="app-logo">Chipi</chipi-logo>
            <chipi-searchbox class="app-search"></chipi-searchbox>
            <chipi-session
                class="app-session"
                @click=${() => app.toBack()}
            ></chipi-session>
        </div>

        <div class="app-content">
            <div>${renderFlags(search.flags, html)} ${renderResults(search.results, html)}</div>

            ${renderPanels(search.panels, html)}
        </div>
    `;
}

function renderBack(store, html, app) {
    const { user, search } = store.getState();

    //If the user is no logged, display the welcome screen
    if (!user) {
        return html`<chipi-welcome></chipi-welcome>`;
    }

    return html`
        Chipi settings
        <button @click="${() => app.toFront()}">Save</button>
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
