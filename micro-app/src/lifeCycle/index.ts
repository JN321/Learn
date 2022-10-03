import { EAppStatus, IAppInfo, IInternalAppInfo, IlifeCycle } from "../types";

let lifeCycle: IlifeCycle = {};

export const setlifeCycle = (lift: IlifeCycle): void => {
  lifeCycle = lift;
};

export const getlifeCycle = () => lifeCycle;

export const runUnmount = async (app: IInternalAppInfo) => {
  // 子应用状态改为卸载中
  app.status = EAppStatus.UNMOUNTING;
  await app.unmount?.(app);
  app.status = EAppStatus.NOT_MOUNTED;
  await runLifecycle("unMounted", app);
};

// 子应用加载前的生命周期
export const runBeforeLoad = async (app: IInternalAppInfo) => {
  app.status = EAppStatus.LOADING;
  await runLifecycle("beforeLoad", app);

  // app html 的加载
  app.status = EAppStatus.LOADED;
};

// 子应用加载前的生命周期 bootstarp 只能执行一次
export const runBootstrap = async (app: IInternalAppInfo) => {
  if (app.status !== EAppStatus.LOADED) {
    return app;
  }
  app.status = EAppStatus.BOOTSTRAPING;
  await app.bootstrap?.(app);
  app.status = EAppStatus.NOT_MOUNTED;
};

export const runMounted = async (app: IInternalAppInfo) => {
  app.status = EAppStatus.MOUNTING;
  await app.mount?.(app);
  app.status = EAppStatus.MOUNTED;

  await runLifecycle("mounted", app);
};

const runLifecycle = async (name: keyof IlifeCycle, app: IAppInfo) => {
  const fn = lifeCycle[name];
  if (fn instanceof Array) {
    await Promise.all(fn.map((item) => item(app)));
  } else {
    await fn?.(app);
  }
};
