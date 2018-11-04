export default class Router {
    constructor(data = {}) {
        this.current;
        this.data = data;
        this.routes = {};
    }

    run(cb) {
        cb(this);
    }

    on(name, route) {
        this.routes[name] = route;
    }

    go(name) {
        if (this.current !== name) {
            this.current = name;
            this.run(this.routes[name]);
        }
    }
}