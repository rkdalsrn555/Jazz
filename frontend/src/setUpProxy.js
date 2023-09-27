const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/openapi/service', {
      target: 'https://api.seibro.or.kr/',
      changeOrigin: true,
    })
  );
};
