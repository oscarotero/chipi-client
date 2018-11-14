import { html } from '../utils/helpers.js';

export default function(app, result, data) {
    const { container, results, search } = app.data;

    results.classList.add('has-panel');
    result.classList.add('is-selected');
    result.blur();

    const panel = html`
        <chipi-panel class="app-panel" tabindex="0" size="3">
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

    container.append(panel);

    panel.addEventListener('keydown', e => {
        if (e.code === 'ArrowLeft' || e.code === 'Escape') {
            app.back();
        }
    });

    panel.addEventListener('click', e => {
        if (e.target === panel) {
            app.back();
        }
    });

    //Link elements
    const tmpbottomFocusableElement = search.bottomFocusableElement;
    const actions = panel.querySelector('.result-actions');
    search.bottomFocusableElement = actions;
    actions.topFocusableElement = search;

    return () => {
        panel.destroy().then(() => {
            search.bottomFocusableElement = tmpbottomFocusableElement;
            results.classList.remove('has-panel');
            result.classList.remove('is-selected');
            result.focus();
        });
    };
}
