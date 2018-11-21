const { protocol } = require('electron');
const { readFile } = require('fs');
const path = require('path');
const { URL } = require('url');

function registerScheme() {
    protocol.registerStandardSchemes(['ch'], { secure: true });
}

function registerBufferProtocol() {
    const MIME_TYPES = {
        '.js': 'text/javascript',
        '.json': 'application/json'
    };

    protocol.registerBufferProtocol(
        'ch',
        (request, respond) => {
            const pathName = new URL(request.url).pathname;

            readFile(path.join(__dirname, '..', pathName), (error, data) => {
                const mimeType = MIME_TYPES[path.extname(pathName).toLowerCase()];
                respond({ mimeType, data });
            });
        },
        error => {
            if (error) {
                console.error(`Failed to register ${scheme} protocol`, error);
            }
        }
    );
}

module.exports = { registerScheme, registerBufferProtocol };
