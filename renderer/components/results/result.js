import { click, onkeydown } from '../../utils/helpers.js';
import Element from '../element.js';
import { loadResult } from '../../actions/panel.js';

export default class Result extends Element {
    constructor() {
        super();

        // onkeydown(['Enter', 'ArrowRight'], this, () => click(this));
    }

    render(html, store) {
        const model = this.model;

        return html`
            <article
                class="result is-list"
                tabindex="0"
                @click=${() => store.dispatch(loadResult(model.id))}
                @mouseenter=${e => e.currentTarget.focus()}
            >
                <div class="result-service avatar">
                    <img src="img/avatar/${model.from.avatar}.jpg" class="avatar-user" />
                    <img src="img/logo/${model.channel.type}.svg" class="avatar-service" />
                </div>

                <nav class="result-location">
                    <ul>
                        ${model.channel.location.map(val => html`<li><button>${val}</button></li>`)}
                    </ul>
                </nav>

                <h2 class="result-title" title="${model.title}">${model.title}</h2>
                <time class="result-time">${new Date(model.time * 1000).toDateString()}</time>
                <p class="result-description">${model.excerpt}</p>
            </article>
            `;
    }
}

customElements.define('chipi-result', Result);
