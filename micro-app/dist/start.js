"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.registerMicroApps = void 0;
const appList_1 = require("./appList");
const lifeCycle_1 = require("./lifeCycle");
const registerMicroApps = (appList, lifeCycles) => {
    appList && (0, appList_1.setAppList)(appList);
    lifeCycles && (0, lifeCycle_1.setlifeCycle)(lifeCycles);
};
exports.registerMicroApps = registerMicroApps;
const start = () => {
    const list = (0, appList_1.getAppList)();
    if (!list.length) {
        throw new Error("请先注册应用");
    }
};
exports.start = start;
//# sourceMappingURL=start.js.map