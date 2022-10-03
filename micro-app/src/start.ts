import { IAppInfo, IlifeCycle } from "./types";
import { setAppList, getAppList } from "./appList";
import { setlifeCycle } from "./lifeCycle";

export const registerMicroApps = (
  appList: IAppInfo[],
  lifeCycles?: IlifeCycle
) => {
  // 对子应用注册信息进行存储
  appList && setAppList(appList);
  lifeCycles && setlifeCycle(lifeCycles);
};

// 启动主应用
export const start = () => {
  const list = getAppList();
  if (!list.length) {
    throw new Error("请先注册应用");
  }
};
