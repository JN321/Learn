const { HttpError } = require('koa');
const Koa = require('koa');
const app = new Koa();

const api = () => new Promise((resolve) => {
    setTimeout(() => {
        console.log('timing...')
        resolve(100);
    },100)
})

app.use(async (ctx, next) => {
    console.log("querying start 1");
    const result = await api();
    ctx.result = result;
    await next();
    console.log("querying end 1");
})


app.use(async (ctx, next) => {
    console.log("querying start 2", ctx.result);
    next();
    console.log("querying end 2");
})


app.use(async (ctx, next) => {
    console.log("querying start 3");
    next();
    console.log("querying end 3");
})

const main = ctx => {
    ctx.body = "hello world";
}

app.use(main)
app.listen(3008)
