// path-to-regexp 用于匹配路由
import { match } from "path-to-regexp";

import { getAppList } from "./appList/index";
import { EAppStatus, IInternalAppInfo } from "./types";

export const getAppListStatus = () => {
  // 根据注册传入的 applist 匹配当前路由
  // 通过监听路由，和注册表里进行匹配，
  // 返回应用的状态

  const actives: IInternalAppInfo[] = [];
  const unmounts: IInternalAppInfo[] = [];

  // as 强制类型装换 IAppInfo 是没有status状态的
  const list = getAppList() as IInternalAppInfo[];

  // 匹配路由
  list.forEach((app) => {
    const isActive = match(app.activeRule, { end: false })(location.pathname);

    switch (app.status) {
      // 未加载状态 -> 需要匹配加载,创建加载列表
      case EAppStatus.NOT_MOUNTED: {
        isActive && actives.push(app);
        break;
      }
      // 已加载状态 -> 需要卸载，创建卸载列表
      case EAppStatus.MOUNTED: {
        !isActive && unmounts.push(app);
        break;
      }
    }
  });

  return { actives, unmounts };
};
