export default class Router {
    constructor(data = {}) {
        this.current;
        this.data = data;
        this.routes = {};
    }

    run(cb, args) {
        cb(this, args);
    }

    on(name, route) {
        this.routes[name] = route;
    }

    go(name, args) {
        if (this.current !== name) {
            this.current = name;
            this.run(this.routes[name], args);
        }
    }
}