export default class App {
    constructor(data = {}) {
        this.current;
        this.data = data;
        this.routes = {};
        this.parent = null;
    }

    run(cb, data) {
        cb(this, data);
    }

    on(name, route) {
        this.routes[name] = route;
    }

    go(name, data) {
        if (this.current !== name || data) {
            this.current = name;
            this.run(this.routes[name], data);
        }
    }
}