/**
 * Assign the focus to the previous or next element with using ".js-focus" selector
 * @param {HTMLElement} element
 * @param {int} range
 */
export function focus(element, range) {
    if (range === undefined) {
        const focusable = getFocusableElement(element);

        if (focusable) {
            focusable.focus();
            return true;
        }

        return;
    }

    const elements = Array.from(element.ownerDocument.querySelectorAll('.js-focus'));
    const index = elements.findIndex(el => el === element);

    if (index !== -1 && elements[index + range]) {
        elements[index + range].focus();
        return true;
    }
}

/**
 * Returns the first focusable element found in an element
 * @param {HTMLElement} element
 */
export function getFocusableElement(element) {
    const selectors = ['.js-focus', '[tabindex],button,input'];

    for (let selector of selectors) {
        const focusable = element.matches(selector) ? element : element.querySelector(selector);

        if (focusable) {
            return focusable;
        }
    }
}

/**
 * Callback to assign functions to keys in a keydown event
 * @param {string|array|object} codes
 * @param {function} callback
 */
export function key(codes, callback) {
    if (typeof codes === 'string') {
        codes = [
            {
                keys: codes.split(','),
                callback
            }
        ];
    } else if (typeof codes === 'object') {
        codes = Object.keys(codes).map(keys => ({
            keys: keys.split(','),
            callback: codes[keys]
        }));
    }

    return event => {
        codes.forEach(code => {
            if (code.keys.includes(event.code)) {
                code.callback(event);
            }
        });
    };
}

/**
 * Trigger a click event
 * @param {HTMLElement} element
 */
export function click(element) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    element.dispatchEvent(event);
}
