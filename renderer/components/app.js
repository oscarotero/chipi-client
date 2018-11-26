import Element from './element.js';

/**
 * The element containing the whole aplication
 */
export default class App extends Element {
    subscribe() {
        this.update();
    }

    render(html, store) {
        const state = store.getState();

        return html`
            <div class="app-front">${renderFront(state, html)}</div>

            <div class="app-back"></div>
        `;
    }
}

customElements.define('chipi-app', App);

function renderFront(state, html) {
    const { user, search } = state;

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
            ${
                search.flags.length
                    ? html`
                          <nav class="flags">
                              <strong class="flags-label">Available flags</strong>
                              <ul is="chipi-navlist" class="flags-list is-horizontal">
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
                      `
                    : ''
            }
            ${
                search.results.length
                    ? html`
                          <ul is="chipi-navlist" class="results">
                              ${
                                  search.results.map(item => {
                                      switch (item.type) {
                                          case 'suggestion':
                                              return html`
                                                  <li><chipi-suggestion .model="${item}"></chipi-suggestion></li>
                                              `;

                                          case 'result':
                                              return html`
                                                  <li><chipi-result .model="${item}"></chipi-result></li>
                                              `;
                                      }
                                  })
                              }
                          </ul>
                      `
                    : ''
            }
            ${
                search.panels.length
                    ? html`
                        ${
                            search.panels.map(panel => {
                                switch (panel.type) {
                                    default:
                                        return html`
                                            <chipi-panel>
                                                <chipi-detail .model="${panel}"></chipi-detail>
                                            </chipi-panel>
                                        `;
                                }
                            })
                        }
                      `
                    : ''
            }
        </div>
    `;
}
