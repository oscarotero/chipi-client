import Element from '../element.js';

export default class Detail extends Element {
    render(html) {
        const model = this.model;

        return html`
            <article class="result is-detail">
                <div class="result-info">
                    <div class="result-service avatar">
                        <img src="img/avatar/${model.from.avatar}.jpg" class="avatar-user" />
                        <img src="img/logo/${model.channel.type}.svg" class="avatar-service" />
                    </div>
                    <nav class="result-location">
                        <ul>
                            ${model.channel.location.map(val => html`<li><button>${val}</button></li>`)}
                        </ul>
                        <time class="result-time">${new Date(model.time * 1000).toDateString()}</time>
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
        `;
    }
}

customElements.define('chipi-detail', Detail);


function renderPanel(data) {
    const panel = html`
        <chipi-panel class="app-panel" tabindex="0" size="3" ref="result-${data.id}">
            
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