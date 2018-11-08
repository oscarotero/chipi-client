import { getFocusableElement, getNextFocusableElement, getPreviousFocusableElement } from '../utils/helpers.js';

customElements.define(
    'chipi-navlist',
    class extends HTMLUListElement {
        constructor() {
            super();

            this.addEventListener('keydown', e => {
                let el;

                switch (e.code) {
                    case 'ArrowUp':
                        el = getLiElement(this);

                        if (el && el.previousElementSibling) {
                            getFocusableElement(el.previousElementSibling).focus();
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }

                        el = getPreviousFocusableElement(this);

                        if (el) {
                            el.focus();
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                        break;

                    case 'ArrowDown':
                        el = getLiElement(this);

                        if (el && el.nextElementSibling) {
                            getFocusableElement(el.nextElementSibling).focus();
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }

                        el = getNextFocusableElement(this);

                        if (el) {
                            el.focus();
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                        }
                        break;
                }
            });
        }

        connectedCallback() {
            if ('autofocus' in this.dataset) {
                this.focus();
            }
        }

        focus() {
            getFocusableElement(this).focus();
        }
    },
    { extends: 'ul' }
);

function getLiElement(elements) {
    const active = document.activeElement;
    return Array.from(elements.children).find(el => el.contains(active));
}
