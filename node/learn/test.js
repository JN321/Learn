/**
 * 简单的koa例子
 */
// const Koa = require("koa");
// const app = new Koa();

// app.use((ctx, next) => {
//   console.log("ctx", ctx);
//   console.log("111");
//   next();
//   console.log("222");
// });
// app.use((ctx, next) => {
//   console.log("333");
//   next();
//   console.log("444");
// });

// app.listen("8088", () => {
//   console.log("请访问：localhost:8088");
// });

// ------------------------------------------------------------------------------------- //

/**
 * 简易的 koa-compose
 */
// function discount(ctx, next) {
//   next(ctx * 0.8);
// }

// function num(ctx, next) {
//   next(ctx * 12);
// }

// function express(ctx, next) {
//   next(ctx + 12);
// }

// const compose = (arg) => {
//   return function (ctx) {
//     let i = 0,
//       result = 0,
//       fn;
//     function dispatch(index, ctxCount) {
//       if (index === arg.length) return (result = ctxCount);
//       if (index < arg.length) fn = arg[index];
//       return fn(ctx, dispatch.bind(null, ++index));
//     }
//     dispatch(i, ctx);
//     return result;
//   };
// };

// const sell = compose([discount, num, express]);
// console.log(sell(50));

// ======================================================================================= //

// const Application = require("./koa-mini/cankao");
const Application = require("./koa-mini/application");

const app = new Application();

app.use(async (ctx, next) => {
  console.log("1111 star");
  await next();
  console.log("1111 end");
});

app.use(async (ctx, next) => {
  console.log("222 star");
  await next();
  console.log("222 end");
  ctx.body = "hello word";
});

app.listen("3000", () => {
  console.log("请访问：localhost:3000");
});
