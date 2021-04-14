const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
// This is only required for development because in production,
// there wont be any Create-React-App. Instead there will be a "build".

// This is required because, since we are using relative paths in express
// api, whenerver we make a request from the React App, it appends,
// its own domain, that is http://localhost:3000/.
// But the domain of Express api is http://localhost:5000.
// To redirect the request to http://localhost:5000, we use this
// setupProxy middleware.
