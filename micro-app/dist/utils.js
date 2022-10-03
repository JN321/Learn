"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppListStatus = void 0;
const path_to_regexp_1 = require("path-to-regexp");
const index_1 = require("./appList/index");
const types_1 = require("./types");
const getAppListStatus = () => {
    const actives = [];
    const unmounts = [];
    const list = (0, index_1.getAppList)();
    list.forEach((app) => {
        const isActive = (0, path_to_regexp_1.match)(app.activeRule, { end: false })(location.pathname);
        switch (app.status) {
            case types_1.EAppStatus.NOT_MOUNTED: {
                isActive && actives.push(app);
                break;
            }
            case types_1.EAppStatus.MOUNTED: {
                !isActive && unmounts.push(app);
                break;
            }
        }
    });
    return { actives, unmounts };
};
exports.getAppListStatus = getAppListStatus;
//# sourceMappingURL=utils.js.map