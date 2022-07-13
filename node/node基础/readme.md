## node 基础
```
<div>
    <button type="primary">{{message}}</button>
    <complex-com></complex-com>
</div>

data() {
    return {
        message:'hello'
    }
},
methods: {
    apiGetData() {
        this.message = '提交中'
        getData().then(res => {
            this.message = '提交完毕';

        })
    }
}
```

命令式编程

### 一. node 是什么？

Node.js 是⼀个 JS 的服务端运⾏环境，基于 V8，是在 JS 语⾔规范的基础上，封装了⼀些服务端的runtime，让我们能够简单实现⾮常多的业务功能。

Node.js 在2009年（第一版npm被创建）诞生之初是为了实现高性能的 web 服务器，再后来 Node.js 慢慢演化为了一门服务端“语言”。

- commonjs 是一个 规范，nodejs 是 cjs 的实现。

LAMP
- Linux + Apache + MySQL + php; (thinkPhP, CI)
MEAN
- mongoDB + express + angular + node.js   2014年


#### node 能做哪些事情？
npm run start 运行了node.

- 跨平台开发： PC  web  H5  RN  Weex 
- 后端开发： API, RPC 
- 前端开发： 前端工具链
- 工具开发：脚本、脚手架、命令行。

#### 分类举例

压缩： UglifyJS, JSMin
管理： npm, yarn, bower,
模块系统： Commonjs, ESM
模块构建： Babel, Browserify, Webpack, Gulp, Grunt,
yeoman
slush
CRA, CLI

#### 问题
`new Thread()`
- 单线程很脆弱，但是可以通过 cluster / pm2 多核并发实现负载均衡;
- node 对 MongoDB, Mysql, redis / neo4j, tigerGraph;
- 安全问题

#### 和浏览器的区别

- Node 环境中是没有 `DOM`, `BOM`, 同样的，浏览器中也没有 `fs`, `path` 这些模块。 
    - why? 如果浏览器支持 fs 会怎么样？
- 事件循环
    - node 的事件循环
    - 浏览器： 微任务、宏任务、raf、 render、 requestIdleCallback
- `cjs`和`esm`
    - Node.js 使用 CommonJS 模块系统，而在浏览器中我们开始看到正在实施的 ESM 标准。

#### 具体的内核

#### node 安装
这个应该不用说，所有可以进行现代化前端开发的小伙伴，都正在使用。

- nvm
是一个 node 版本管理工具。
- nrm
用于对 node 镜像源进行设置。
- npm 

### 二. npm 相关

gem-Ruby pip-Python maven-java

maven 全局包管理。

spring-framework 2.2.0

org/java/apache/spring/spring-framwork/2.2.0 2.2.1 2.2.2


#### npm 的目标？
> 给你和你的团队、你的公司带来最好的开源库和依赖。

#### npm install 工作原理

#### npm 缓存
`npm config get cache`
`yarn cache dir`

#### npm CI

和 install 不同的是，
1. 必须要有 package-lock.json 文件，
2. 且下载完全依赖该文件；
3. 会删除 node_modules；
4. 如果和 package.json 冲突，则直接报错。
5. 只能一次性安装；
6. 永不改写 package.json 和 package-lock.json 文件。
#### npm 的包依赖关系
`npm dedupe`;


#### xxxDependencies
比如，我们要构建一个 公共组件库。
luyi-ui



##### dependencies 项目依赖
lodash (debounce, deepMerge)

##### devDependencies 开发依赖
webpack, rollup, jest

##### peerDependencies 同版本依赖
vue 组件库。
如果说你连 vue 都没，那这个项目对你来说，没有意义。

##### bundledDependencies 捆绑依赖
{
    bundle1, bundle2
}
##### optionalDependencies 可选依赖
可选依赖。

### 二. commonJS 模块化

#### 什么是 cjs 的模块化

为什么会有 cjs 这种东西，讲一段历史。

#### 手写一个 cjs 规范

#### 关于模块化的问题和说明

#### 一起看看源码

