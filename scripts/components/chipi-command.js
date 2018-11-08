customElements.define(
    'chipi-command',
    class extends HTMLButtonElement {
        connectedCallback() {
            const code = this.dataset.command;

            if (code) {
                this.innerHTML += ` <code>${code}</code>`;
            }
        }
    },
    { extends: 'button' }
);
