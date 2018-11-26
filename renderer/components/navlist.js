import { getFocusableElement, focus } from '../utils/helpers.js';

/**
 * Generic <ul> to use the keyboard to navigate
 */
export default class Navlist extends HTMLUListElement {
    constructor() {
        super();
        this.mode = this.classList.contains('is-horizontal') ? 'horizontal' : 'vertical';
        this.classList.add('js-focus');

        this.addEventListener('keydown', event => {
            switch (event.code) {
                case 'ArrowUp':
                    if ((this.mode === 'vertical' && this.focusPrevious()) || focus(this, -1)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    break;

                case 'ArrowDown':
                    if ((this.mode === 'vertical' && this.focusNext()) || focus(this, 1)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    break;

                case 'ArrowRight':
                    if (this.mode === 'horizontal' && this.focusNext()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    break;

                case 'ArrowLeft':
                    if (this.mode === 'horizontal' && this.focusPrevious()) {
                        event.preventDefault();
                        event.stopPropagation();
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

    focusPrevious() {
        const el = getLiElement(this);

        if (el && el.previousElementSibling) {
            getFocusableElement(el.previousElementSibling).focus();
            return true;
        }
    }

    focusNext() {
        const el = getLiElement(this);

        if (el && el.nextElementSibling) {
            getFocusableElement(el.nextElementSibling).focus();
            return true;
        }
    }
}

customElements.define('chipi-navlist', Navlist, { extends: 'ul' });

function getLiElement(elements) {
    const active = document.activeElement;
    return Array.from(elements.children).find(el => el.contains(active));
}
