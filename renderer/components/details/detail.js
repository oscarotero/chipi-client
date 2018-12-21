import Element from '../element.js';

export default class Detail extends Element {
    render(html) {
        const model = this.model;

        return html`
            <article class="detail">
                <nav class="detail-location result-location">
                    <img src="img/logo/${model.channel.type}.svg" class="detail-location-service" />
                    <ul>
                        ${model.channel.location.map(val => html`<li><button>${val}</button></li>`)}
                    </ul>
                </nav>

                <div class="detail-preview preview">
                    <div class="preview-info">
                        <div class="avatar">
                            <img src="img/avatar/${model.from.avatar}.jpg" class="avatar-user" />
                        </div>
                        <div>
                            <strong>By ${model.from.user}</strong><br>
                            <time>${new Date(model.time * 1000).toDateString()}</time>
                        </div>
                    </div>

                    ${this.renderPreview(html)}
                </div>

                <ul is="chipi-navlist" class="detail-actions" data-autofocus>
                    ${
                        this.commands.map(cmd => 
                            html`<li><button is="chipi-command" data-command="${cmd.cmd}" @click="${cmd.click}">${cmd.text}</button></li>`
                        )
                    }
                </ul>
            </article>
        `;
    }

    view(callback) {
        callback(document.getElementById('viewer'));
    }
}
