import Element from '../element.js';
import { click, key } from '../../utils/helpers.js';
import { selectResult } from '../../actions/search.js';

export default class Result extends Element {
    render(html) {
        const model = this.model;

        return html`
            <article
                class="result is-list ${model.selected ? 'is-selected' : ''}"
                tabindex="0"
                id="${'item-' + model.id}"
                @click=${() => this.store.dispatch(selectResult(model.id))}
                @mouseenter=${e => e.currentTarget.focus()}
                @keydown=${key('Enter,ArrowRight', e => click(e.currentTarget))}
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
