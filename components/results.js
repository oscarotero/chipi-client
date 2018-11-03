export default class Results {
    constructor(results) {
        this.results = results;

        this.results.addEventListener('keydown', e => {            
            let el;

            switch (event.code) {
                case 'ArrowUp':
                    el = getElement(this.results);

                    if (el && el.previousElementSibling) {
                        el.previousElementSibling.querySelector('[tabindex]').focus();
                    }
                    break;

                case 'ArrowDown':
                    el = getElement(this.results);

                    if (el && el.nextElementSibling) {
                        el.nextElementSibling.querySelector('[tabindex]').focus();
                    }
                    break;
            }
        });
    }
}

function getElement(elements) {
    const active = document.activeElement;
    return Array.from(elements.children).find(el => el.contains(active));
}