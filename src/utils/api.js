export function fetchSuggestions() {
    return api('suggestions');
}

export function fetchResults(query) {
    return api('results');
}

function api(path, logo = {}, delay = 500) {
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

function wait(data, time) {
    return new Promise(resolve => setTimeout(() => resolve(data), time));
}