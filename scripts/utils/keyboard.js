export default class Keyboard {
    constructor(context = document) {
        this.events = [];
        this.queue(context);
    }

    queue(context) {
        this.events.unshift({
            context: context,
            events: []
        });
    }

    unqueue() {
        const {context, events} = this.events.shift();
        events.forEach(event => context.removeEventListener(event.eventType, event.eventHandler));
    }

    on(eventType, selector, callback) {
        const {context, events} = this.events[0];
        
        switch(eventType) {
            case 'click':
            case 'submit':
            case 'input':
            case 'change':
                events.push(on(eventType, context, selector, callback));
                break;
                
            case 'type':
                events.push(on('keydown', context, selector, function (event, target) {
                    if (event.code.startsWith('Key')) {
                        callback(event, target);
                    }
                }));
                break;

            case 'Enter':
            case 'Escape':
            case 'ArrowDown':
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowLeft':
                events.push(onKeyboard(eventType, context, selector, callback));
                break;
            
            default:
                throw new Error(`Invalid eventType "${eventType}"`);
        }

        return this;
    }
}

function on(eventType, context, selector, callback) {
    function eventHandler (event) {
        for (
            let target = event.target;
            target && target !== this;
            target = target.parentNode
        ) {
            if ((typeof selector === 'string' && target.matches(selector)) || selector === target) {
                callback.call(target, event, target);
                event.stopPropagation();
                break;
            }
        }
    }

    context.addEventListener(eventType, eventHandler, true);
    return {eventType, eventHandler};
}

function onKeyboard(key, context, selector, callback) {
    function handler(event, target) {
        if (event.code === key) {
            callback(event, target);
        }
    }

    return on('keydown', context, selector, handler);
}