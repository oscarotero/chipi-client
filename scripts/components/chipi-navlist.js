const _previousFocusableElement = Symbol.for('_previousFocusableElement');
const _nextFocusableElement = Symbol.for('_nextFocusableElement');

import { getFocusableElement } from '../utils/helpers.js';

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

                        if (this.previousFocusableElement) {
                            getFocusableElement(this.previousFocusableElement).focus();
                            e.preventDefault();
                            e.stopPropagation();
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

                        if (this.nextFocusableElement) {
                            getFocusableElement(this.nextFocusableElement).focus();
                            e.preventDefault();
                            e.stopPropagation();
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

        set previousFocusableElement(element) {
            this[_previousFocusableElement] = element;
        }

        get previousFocusableElement() {
            return this[_previousFocusableElement];
        }

        set nextFocusableElement(element) {
            this[_nextFocusableElement] = element;
        }

        get nextFocusableElement() {
            return this[_nextFocusableElement];
        }
    },
    { extends: 'ul' }
);

function getLiElement(elements) {
    const active = document.activeElement;
    return Array.from(elements.children).find(el => el.contains(active));
}
