import Detail from './detail.js';

export default class Gdrive extends Detail {
    get commands() {
        const cmds = [
            {
                text: 'Show in Gdrive',
                cmd: 'Enter'
            },
            {
                text: 'Copy Link',
                cmd: '⌘L'
            },
            {
                text: 'Download',
                cmd: '⌘D'
            },
            {
                text: 'Send to...',
                cmd: '⌘S'
            },
        ];

        if (this.model.preview) {
            cmds.splice(1, 0, {
                text: 'View',
                cmd: 'Space'
            })
        }

        return cmds;
    }

    renderPreview(html) {
        if (this.model.preview) {
            return html`
                <section class="preview-content has-document">
                    <a href="#" class="document">
                        <img src="${this.model.preview}" alt="">
                    </a>
                </section>
                `;
        }
        return html`
            <section class="preview-content has-icon">
                <a href="#" class="file">
                    <span class="file-icon">
                        <img src="img/logo/sketch.svg" alt="">
                        sketch
                    </span>
                    <strong>Logo.sketch</strong>
                    <small>Sketch file, 116 KB</small>
                </a>
            </section>
            `;
    }
}

customElements.define('chipi-detail-gdrive', Gdrive);
