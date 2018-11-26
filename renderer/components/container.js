// import Results from './results.js';
// import { html } from '../utils/helpers.js';
import { popPanel } from '../actions/panel.js';
import store from '../store.js';

export default class Container extends HTMLElement {
    connectedCallback() {
        this.append(new Results());

        const panels = [];

        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();

            if (state.panels.length < panels.length) {
                panels.splice(state.panels.length).forEach(panel => panel.destroy());
            } else if (state.panels.length > panels.length) {
                state.panels.slice(panels.length).forEach(panel => {
                    const element = renderPanel(panel);
                    panels.push(element);
                    this.append(element);
                });
            }
        });
    }

    disconnectedCallback() {
        this.unsubscribe();
    }
}

customElements.define('chipi-container', Container);

function renderPanel(data) {
    const panel = html`
        <chipi-panel class="app-panel" tabindex="0" size="3" ref="result-${data.id}">
            <article class="result is-detail">
                <div class="result-info">
                    <div class="result-service avatar">
                        <img src="img/avatar/${data.from.avatar}.jpg" class="avatar-user" />
                        <img src="img/logo/${data.channel.type}.svg" class="avatar-service" />
                    </div>
                    <nav class="result-location">
                        <ul>
                            ${data.channel.location.map(val => `<li><button>${val}</button></li>`)}
                        </ul>
                        <time class="result-time">${new Date(data.time * 1000).toDateString()}</time>
                    </nav>
                </div>

                <ul is="chipi-navlist" class="result-actions" data-autofocus>
                    <li><button is="chipi-command" data-command="Enter">Show in Slack</button></li>
                    <li><button is="chipi-command" data-command="⌘C">Copy message</button></li>
                    <li><button is="chipi-command" data-command="⌘S">Send to...</button></li>
                </ul>
                <div class="result-content">
                    <p>
                        Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to
                        recover fully before getting back to work 😀
                    </p>
                </div>
            </article>
        </chipi-panel>
    `;

    panel.addEventListener('keydown', e => {
        if (e.code === 'ArrowLeft' || e.code === 'Escape') {
            store.dispatch(popPanel());
        }
    });

    panel.addEventListener('click', e => {
        if (e.target === panel) {
            store.dispatch(popPanel());
        }
    });

    return panel;
}
