const http = require("http");

class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

const compose = (middlewares) => {
  return function (ctx) {
    const dispatch = (i) => {
      const fn = middlewares[i];
      if (i === middlewares.length) return;
      return fn(ctx, dispatch.bind(null, ++i));
    };
    return dispatch(0);
  };
};

module.exports = class Application {
  constructor() {
    this.middleware = [];
  }

  use(callback) {
    this.middleware.push(callback);
  }

  listen(...arg) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
      const fn = compose(this.middleware);
      console.log("fn", fn);
      try {
        await fn(ctx);
      } catch (e) {
        console.log(e);
        ctx.res.statusCode = 500;
        ctx.res.end("服务器报错");
      }
      ctx.res.end(ctx.body);
    });

    server.listen(...arg);
  }
};
