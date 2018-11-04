import { getNextFocusableElement, getPreviousFocusableElement } from '../utils.js';

export default class Results extends HTMLUListElement {
    constructor() {
        super();

        this.addEventListener('keydown', e => {            
            let el;

            switch (e.code) {
                case 'ArrowUp':
                    el = getLiElement(this);

                    if (el && el.previousElementSibling) {
                        el.previousElementSibling.querySelector('[tabindex]').focus();
                        return
                    }

                    el = getPreviousFocusableElement(this);

                    if (el) {
                        el.focus();
                        return;
                    }
                    break;

                case 'ArrowDown':
                    el = getLiElement(this);

                    if (el && el.nextElementSibling) {
                        el.nextElementSibling.querySelector('[tabindex]').focus();
                        return;
                    }

                    el = getNextFocusableElement(this);

                    if (el) {
                        el.focus();
                        return;
                    }
                    break;
            }
        });
    }
}

function getLiElement(elements) {
    const active = document.activeElement;
    return Array.from(elements.children).find(el => el.contains(active));
}
