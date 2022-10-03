"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMounted = exports.runBootstrap = exports.runBeforeLoad = exports.runUnmount = exports.getlifeCycle = exports.setlifeCycle = void 0;
const types_1 = require("../types");
let lifeCycle = {};
const setlifeCycle = (lift) => {
    lifeCycle = lift;
};
exports.setlifeCycle = setlifeCycle;
const getlifeCycle = () => lifeCycle;
exports.getlifeCycle = getlifeCycle;
const runUnmount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    app.status = types_1.EAppStatus.UNMOUNTING;
    yield ((_a = app.unmount) === null || _a === void 0 ? void 0 : _a.call(app, app));
    app.status = types_1.EAppStatus.NOT_MOUNTED;
    yield runLifecycle("unMounted", app);
});
exports.runUnmount = runUnmount;
const runBeforeLoad = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.status = types_1.EAppStatus.LOADING;
    yield runLifecycle("beforeLoad", app);
    app.status = types_1.EAppStatus.LOADED;
});
exports.runBeforeLoad = runBeforeLoad;
const runBootstrap = (app) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (app.status !== types_1.EAppStatus.LOADED) {
        return app;
    }
    app.status = types_1.EAppStatus.BOOTSTRAPING;
    yield ((_b = app.bootstrap) === null || _b === void 0 ? void 0 : _b.call(app, app));
    app.status = types_1.EAppStatus.NOT_MOUNTED;
});
exports.runBootstrap = runBootstrap;
const runMounted = (app) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    app.status = types_1.EAppStatus.MOUNTING;
    yield ((_c = app.mount) === null || _c === void 0 ? void 0 : _c.call(app, app));
    app.status = types_1.EAppStatus.MOUNTED;
    yield runLifecycle("mounted", app);
});
exports.runMounted = runMounted;
const runLifecycle = (name, app) => __awaiter(void 0, void 0, void 0, function* () {
    const fn = lifeCycle[name];
    if (fn instanceof Array) {
        yield Promise.all(fn.map((item) => item(app)));
    }
    else {
        yield (fn === null || fn === void 0 ? void 0 : fn(app));
    }
});
//# sourceMappingURL=index.js.map