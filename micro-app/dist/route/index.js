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
exports.hackRoute = void 0;
const utils_1 = require("../utils");
const lifeCycle_1 = require("../lifeCycle");
const originPush = window.history.pushState;
const originReplace = window.history.replaceState;
const capturedListern = {
    hashchange: [],
    popstate: [],
};
const hasListener = (name, fn) => {
    return !!capturedListern[name].filter((listener) => listener === fn).length;
};
let lastUrl = null;
const reRoute = (url) => {
    if (lastUrl !== url) {
        const { actives, unmounts } = (0, utils_1.getAppListStatus)();
        Promise.all(unmounts
            .map((app) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, lifeCycle_1.runUnmount)(app);
        }))
            .concat(actives.map((app) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, lifeCycle_1.runBeforeLoad)(app);
            yield (0, lifeCycle_1.runBootstrap)(app);
            yield (0, lifeCycle_1.runMounted)(app);
        }))));
    }
};
const handleUrlChange = () => {
    reRoute(location.href);
};
const hackEventListener = (func) => {
    return function (name, fn) {
        if (name === "hashchange" || name === "popstate") {
            if (!hasListener(name, fn)) {
                capturedListern[name].push(fn);
                return;
            }
            capturedListern[name] = capturedListern[name].filter((listener) => listener !== fn);
        }
        func.apply(window, arguments);
    };
};
const hackRoute = () => {
    window.history.pushState = (...arg) => {
        originPush.apply(window.history, arg);
        reRoute(arg === null || arg === void 0 ? void 0 : arg[2]);
    };
    window.history.replaceState = (...arg) => {
        originReplace.apply(window.history, arg);
        reRoute(arg[2]);
    };
    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener = hackEventListener(window.addEventListener);
    window.removeEventListener = hackEventListener(window.removeEventListener);
};
exports.hackRoute = hackRoute;
//# sourceMappingURL=index.js.map