import Koa from 'koa';
import Router from 'koa-router';

import bodyPaser from 'koa-bodyparser';


import { controllers } from './utils/decorator';
import Routers from './controller/index'
const app = new Koa();
const router = new Router(); 


// cors
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    if (ctx.request.method.toLowerCase() == 'options') {
        ctx.state = 200;  //让options尝试请求快速结束
    } else {
        await next();
    }
})

app.use(bodyPaser())


console.log('controllers', controllers)

controllers.forEach(item => {
    // 每个路由的前缀
    let { url, constructor, method, handler } = item;
    const { prefix } = constructor;
    if (prefix) url = `${prefix}${url}`;
    console.log(url, method, handler)
    router[method](url, handler)
})

app.use(router.routes())

app.listen(3008, () => {
    console.log("server is listening in 3008")
})