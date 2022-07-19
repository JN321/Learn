# Node 框架介绍

## 课程目标
- 清楚后端大概的一个体系
- 知道我如果要写一个后端框架，去读 DB ，显示。
[补位], [卡位]. 

## express / koa

express / koa 有什么区别 ？
- 概念
express 是一个基于 node.js 平台的一个灵活的 web 应用开发框架， connect 中间件；
koa2 相对来说，更新一些，也是由 express 原班人马打造的框架；

- 集成性
express 内置了视图、static 等部分
koa 要通过中间件来实现

### 什么是洋葱模型
```js
const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use((ctx, next) => {
    console.log(1);
    next();
    console.log(2);
});

// 中间件 2 
app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
});

app.listen(8000, '0.0.0.0', () => {
    console.log(`Server is starting`);
});

```

### koa 框架原理解析

```js
// ⼊⼝⽅法
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
// (res, req) => {  }
callback() {
		// 处理中间件，等一下看compose和this.middleware
    const fn = compose(this.middleware);
		// 错误处理，listenerCount是EventEmitter类的函数
    if (!this.listenerCount('error')) this.on('error', this.onerror);
		// 传递给createServer的就是下面这个函数
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
}

handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    // 这里等到response再看
    const handleResponse = () => respond(ctx);
    // 给请求结束增加一个回调，这个onerror是ctx的onerror，不是app的onerror
    onFinished(res, onerror);
    // 等一下看这个
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}

// 添加中间件⽅法
use(fn) {
    ...
    this.middleware.push(fn);
    return this;
}

createContext(req, res) {
	// 每次请求，ctx都是一个新的对象
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    // 原生的req和res
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    // koa生成的request和response
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
}

```

### koa-compose
```js
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


```

### koa 常用中间件
- koa2-cors
- koa-static
- koa-bodyparser

## BFF 

什么是 BFF ？

https://samnewman.io/patterns/architectural/bff/?fileGuid=xxQTRXtVcqtHK6j8
不是一种技术，而是一种在后端普遍采用微服务的情况下，作为适配层，更好的为前端服务。


BFF 一般的作用有哪些 ？

优势：
降低沟通成本
提升用户

问题：
分工
加了一层，比较繁琐
资源浪费

特点：
- 数据处理
数据聚合和裁剪
格式转换

- 流量处理
请求分发能力，代理，可靠性

- 安全问题
鉴权
CSP


## Sequelize (gitstar 20K)

Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

其他常用的ORM

typeorm -- TS 支持比较好

prisma -- 类型推导更强

knex 

bookshelf

### 安装 Sequelize
```shell
npm i sequelize
# 使用 npm
npm i pg pg-hstore # PostgreSQL
npm i mysql2 # MySQL
npm i mariadb # MariaDB
npm i sqlite3 # SQLite
npm i tedious # Microsoft SQL Server
npm i ibm_db # DB2
```

### 一些常用命令，来在数据库里创建相应的数据表
根据项目下的 .sequelizerc 文件，执行

#### 执行 sequelize init 响应操作
-  `npx sequelize init:config`
生成 config.json 的文件；

- `npx sequelize init:migrations`
生成 migrations 文件夹；

#### 执行 sequlize migration 
- `npx sequelize migration:generate --name=init-users`
初始化数据表；

#### 对数据操作
- `npx sequelize db:migrate`
升级数据库，将表推送到数据库中；

- `npx sequelize db:migrate:undo:all`
回退到初始状态；


### sequelize-auto 的工具，自动生成 ORM


## 学习资料

### node
- 朴灵 深入浅出 node
- 狼叔 - 狼书

### 浏览器
- 极客时间 - 盛大网络，李兵？
- 犀牛书 JavaScript 权威指南


### 网络底层
- 小林图解网络


## 答疑

### 1. 对于没有接触过的领域怎么办
- 没有接触过的领域，了解宏观。
- 经验。

### 2. loader 和 plugin
loader 是在 webpack 的某个阶段上的解析器。
babel-loader 
less-loader 
css-loader 
style-loader 

plugin 是在 webpack -- tapable 

"emit, afterEmit, make, seal, compile"

