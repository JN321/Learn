"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppList = exports.setAppList = void 0;
let appList = [];
const setAppList = (list) => {
    appList = list;
};
exports.setAppList = setAppList;
const getAppList = () => appList;
exports.getAppList = getAppList;
//# sourceMappingURL=index.js.map