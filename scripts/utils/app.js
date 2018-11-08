export default class App {
    constructor(data = {}) {
        this.current;
        this.data = data;
        this.routes = {};
        this.previous = null;
    }

    run(cb, data) {
        this.back();
        this.previous = cb(this, data);
    }

    on(name, handler) {
        this.routes[name] = handler;
    }

    go(name, data) {
        if (this.current !== name || data) {
            this.current = name;
            this.run(this.routes[name], data);
        }
    }

    back() {
        if (typeof this.previous === 'function') {
            this.previous(this);
        }

        this.previous = null;
    }
}
