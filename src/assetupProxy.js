import {createProxyMiddleware} from "http-proxy-middleware"

module.exports = function(app) {
  app.use(
      '/',
      createProxyMiddleware({
        target: 'http://78.29.34.68:8888',
        changeOrigin: true,
      })
  );
};