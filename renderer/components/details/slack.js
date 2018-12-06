import Detail from './detail.js';

export default class Slack extends Detail {
    get commands() {
        return [
            {
                text: 'Show in Slack',
                cmd: 'Enter'
            },
            {
                text: 'Copy Message',
                cmd: '⌘C'
            },
            {
                text: 'Copy Link',
                cmd: '⌘L'
            },
            {
                text: 'Send to...',
                cmd: '⌘S'
            },
        ]
    }

    renderPreview(html) {
        return html`
            <div class="preview-content has-short-text">
                <p>
                    Hey Carlos, was talking with Jing about you, no rush to be back to work, take a decent rest to
                    recover fully before getting back to work 😀
                </p>
            </div>
            `;
    }
}

customElements.define('chipi-detail-slack', Slack);
