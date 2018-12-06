import Detail from './detail.js';

export default class Gmail extends Detail {
    get commands() {
        return [
            {
                text: 'Show in Gmail',
                cmd: 'Enter'
            },
            {
                text: 'Full Conversation',
                cmd: 'SPACE'
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
                <h2>Jing Li (@jingli78) invited you to join the team "Chipi" on Trello</h2>
                
                <p>
                Hey there! Jing Li invited you to join the Chipi team on Trello
                <br>
                <br>
                ---------------------------------------
                <br>
                <br>
                Go to team: <a href="https://trello.com/organizationinvited/5a80aaa66810caa2fe761b80/5bf0803ccefbf70768ebf98d/d71d066ae82985779f03a80093e73628?utm_source=eval-email&utm_medium=email&utm_campaign=team-invite">https://trello.com/organizationinvited/5a80aaa66810caa2fe761b80/5bf0803ccefbf70768ebf98d/d71d066ae82985779f03a80093e73628?utm_source=eval-email&utm_medium=email&utm_campaign=team-invite</a>
                <br>
                <br>
                ---------------------------------------
                <br>
                <br>
                Trello boards help your team put plans into action and achieve goals together. Learn more at <a href="http://trello.com">http://trello.com</a>
            </section>
            `;
    }
}

customElements.define('chipi-detail-gmail', Gmail);
