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