import { EventType } from "../types";
import { getAppListStatus } from "../utils";
import {
  runUnmount,
  runBeforeLoad,
  runBootstrap,
  runMounted,
} from "../lifeCycle";
const originPush = window.history.pushState;
const originReplace = window.history.replaceState;

/**
 * Record 非常好用的工具类型 Record<K,T>构造具有给定类型 T 的一组属性 K 的类型
 *
 * const example: Record<number, number[]> = {
 *   0: [1, 2, 3],
 *   1: [4, 5, 6]
 * }
 */
const capturedListern: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: [],
};

const hasListener = (name: EventType, fn: Function): Boolean => {
  return !!capturedListern[name].filter((listener) => listener === fn).length;
};

let lastUrl: string | null = null;

// 子应用路由逻辑处理
const reRoute = (url: string | URL) => {
  // 只有路由改变了，才去做应用的切换,子应用逻辑的处理
  // 包括对主应用生命周期的处理、对子应用的加载和卸载
  if (lastUrl !== url) {
    const { actives, unmounts } = getAppListStatus();
    // 拿到应用列表之后，就要进行子应用生命周期的渲染了
    Promise.all(
      unmounts
        .map(async (app) => {
          // 卸载逻辑
          await runUnmount(app);
        })
        .concat(
          actives.map(async (app) => {
            // 执行全局的生命周期
            await runBeforeLoad(app);
            // 子应用的bootstrap
            await runBootstrap(app);
            // 子应用的挂载
            await runMounted(app);
          })
        )
    );
  }
};

const handleUrlChange = () => {
  reRoute(location.href);
};

// 对事件监听的重写
const hackEventListener = (func: Function): any => {
  return function (name: string, fn: Function) {
    if (name === "hashchange" || name === "popstate") {
      // 事件添加监听
      if (!hasListener(name, fn)) {
        capturedListern[name].push(fn);
        return;
      }
      // 事件移除监听
      capturedListern[name] = capturedListern[name].filter(
        (listener) => listener !== fn
      );
    }

    func.apply(window, arguments);
  };
};

// 路由拦截
export const hackRoute = () => {
  window.history.pushState = (...arg): any => {
    // 触发原有逻辑
    originPush.apply(window.history, arg);
    reRoute(arg?.[2]);
  };

  window.history.replaceState = (...arg): any => {
    // 触发原有逻辑
    originReplace.apply(window.history, arg);
    reRoute(arg[2]);
  };

  window.addEventListener("hashchange", handleUrlChange);
  window.addEventListener("popstate", handleUrlChange);

  window.addEventListener = hackEventListener(window.addEventListener);
  window.removeEventListener = hackEventListener(window.removeEventListener);
};
