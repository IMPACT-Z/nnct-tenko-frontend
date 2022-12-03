const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1/tenko',
        createProxyMiddleware({
            target: process.env.REACT_APP_API_PREFIX,
            changeOrigin: true,
        })
    );
};