const settings = require('electron-settings');

const defaults = {
    onChange: {},
    hideOnBlur: true,
    globalShortcut: 'Control+Space'
};

function get(key) {
    return settings.get(key, defaults[key]);
}

function set(key, value) {
    settings.set(key, value);
}

function watch(key, callback) {
    settings.watch(key, callback);
}

module.exports = { get, set, watch };
