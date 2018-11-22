export default class App {
    constructor(data = {}) {
        this.current;
        this.data = data;
        this.routes = {};
        this.previous = null;
    }

    run(cb, ...args) {
        this.back();
        this.previous = cb(this, ...args);
    }

    on(name, handler) {
        this.routes[name] = handler;
    }

    go(name, ...args) {
        if (this.current !== name || args.length) {
            this.current = name;
            this.run(this.routes[name], ...args);
        }
    }

    back() {
        if (typeof this.previous === 'function') {
            this.previous(this);
        }

        this.previous = null;
    }
}
