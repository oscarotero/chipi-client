export function getFocusableElement(element) {
    return element.querySelector('[tabindex],button,input');
}

export function getPreviousFocusableElement(element) {
    let context = element.previousElementSibling;

    while (context && context !== document.body) {
        const focusable = getFocusableElement(context);

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
        const focusable = getFocusableElement(context);

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
            for (var target = event.target; target && target !== this; target = target.parentNode) {
                if (target.matches(selector)) {
                    callback.call(target, event, target);
                    break;
                }
            }
        },
        true
    );
}

export function onkeydown(code, context, callback) {
    if (!Array.isArray(code)) {
        code = [code];
    }

    context.addEventListener('keydown', function(event) {
        if (code.includes(event.code)) {
            callback(event, this);
        }
    });
}

export function click(element) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    element.dispatchEvent(event);
}

export function api(path, logo, delay = 500) {
    logo.state = 'searching';

    return fetch(`api/${path}.json`)
        .then(res => res.json())
        .catch(err => {
            logo.state = ':(';
            console.error(err);
        })
        .then(data => wait(data, delay))
        .then(data => {
            logo.state = ':p';
            return data;
        });
}

export function html(strings, ...args) {
    const nodes = [];
    let code = args.map((value, index) => {
        if (Array.isArray(value)) {
            if (value[0] instanceof Node) {
                const fragment = document.createDocumentFragment();
                value.forEach(el => fragment.appendChild(el));
                value = fragment;
            } else {
                value = value.join('');
            }
        }

        if (value instanceof Node) {
            const i = nodes.length;
            nodes.push(value);
            value = `<div id="__placeholder-${i}"></div>`;
        }

        return strings[index] + value;
    }).join(''); 

    code += strings[strings.length - 1];

    const template = document.createElement('template');
    template.innerHTML = code;
    const content = template.content;
    nodes.forEach((node, i) => content.getElementById(`__placeholder-${i}`).replaceWith(node));
    return content.childElementCount === 1 ? content.firstElementChild : content;
}