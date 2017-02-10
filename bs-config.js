var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/', {
                target: 'localhost:3000'
            })
        }
    }
};
