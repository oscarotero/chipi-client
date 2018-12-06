import Detail from './detail.js';

export default class Gmail extends Detail {
    get commands() {
        return [
            {
                text: 'Show in Trello',
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
            <section class="preview-content has-message">
                <header>
                    <h2>Trello integration</h2>
                    <p>In Progress</p>
                </header>
                
                <p>
                    Goal
                    Problem we are trying to solve
                    Proposed solution
                    Key benefits
                    What success looks like
                    Push Mark's monthly searches over 100
                </p>
            </section>
            `;
    }
}

customElements.define('chipi-detail-trello', Gmail);
