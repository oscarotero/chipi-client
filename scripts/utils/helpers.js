export function getPreviousFocusableElement(element) {
    let context = element.previousElementSibling;

    while (context && context !== document.body) {
        const focusable = context.querySelector('[tabindex],button,input');

        if (focusable) {
            focusable.focus();
            return;
        }

        context = context.parentElement.previousElementSibling;
    }
    return;
}

export function getNextFocusableElement(element) {
    let context = element.nextElementSibling;

    while (context && context !== document.body) {
        const focusable = context.querySelector('[tabindex],button,input');

        if (focusable) {
            focusable.focus();
            return;
        }

        context = context.parentElement.nextElementSibling;
    }
    return;
}

export function wait(data, time) {
    return new Promise(resolve => setTimeout(() => resolve(data), time));
}

export function on(eventType, context, selector, callback) {
    context.addEventListener(
        eventType,
        function(event) {
            for (
                var target = event.target;
                target && target !== this;
                target = target.parentNode
            ) {
                if (target.matches(selector)) {
                    callback.call(target, event, target);
                    break;
                }
            }
        },
        true
    );
}

export function click(element) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    element.dispatchEvent(event);
}

const parser = new DOMParser();

export function parse(html) {
    const doc = parser.parseFromString(html, 'text/html');
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.children).forEach(el => fragment.appendChild(el));
    return fragment;
}
