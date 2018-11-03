export default class Results extends HTMLUListElement {
    constructor() {
        super();

        this.addEventListener('keydown', e => {            
            let li;

            switch (e.code) {
                case 'ArrowUp':
                    li = getLiElement(this);

                    if (li && li.previousElementSibling) {
                        li.previousElementSibling.querySelector('[tabindex]').focus();
                    }
                    break;

                case 'ArrowDown':
                    li = getLiElement(this);

                    if (li && li.nextElementSibling) {
                        li.nextElementSibling.querySelector('[tabindex]').focus();
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