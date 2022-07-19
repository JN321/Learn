export const RequestMethod = {
    "GET": "get",
    "POST": "post",
    "PUT": "pust",
    "DELETE": "delete",
    "OPTION": "option",
    "PATCH": "patch"
}

export const controllers = [];

// 
// 装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
// 这意味着，装饰器能在编译阶段运行代码。
// 也就是说，装饰器本质就是编译时执行的函数。
export function Controller(prefix = "") {
    return function (target) {
        // 给controller类添加路由前缀
        // console.log('给controller类添加路由前缀', target)
        target.prefix = prefix;
    }
}

/**
 * 给controller类的方法添加装饰
 * url 可选
 * method 请求方法
 * middleware 中间件
 */
export function RequestMapping(method = "", url = "", middleware = []) {
    // console.log("函数装饰器执行",)
    return function (target, name, descriptor) {
        // console.log("给函数添加装饰器", target, name)
        let path = "";
        // 判断有没有定义url
        if (!url) {
            // 取方法名作为路径
            path = `/${name}`;
        } else {
            // 自己定义的url
            path = url;
        }
        // 创建router需要的数据 url，method，middleware（可以没有）,最终执行的方法，装饰器队对象的构造函数
        const item = {
            url: path, // constructor.prefix + '/all' 
            method: method, // RequestMethod.GET - get
            middleware: middleware,
            handler: target[name], // 
            constructor: target.constructor,
        };
        controllers.push(item);
    }
}