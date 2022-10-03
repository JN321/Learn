export interface IAppInfo {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}

// type 的作用是给类型起一个新的名字
export type Lifecycle = (app: IAppInfo) => Promise<any>;

// 全局生命周期
export interface IlifeCycle {
  beforeLoad?: Lifecycle | Lifecycle[];
  mounted?: Lifecycle | Lifecycle[];
  unMounted?: Lifecycle | Lifecycle[];
}

export type EventType = "hashchange" | "popstate";

// 子应用自己的状态
export enum EAppStatus {
  NOT_FOUND = "NOT_FOUND",
  LOADING = "LOADING",
  LOADED = "LOADED",
  BOOTSTRAPING = "BOOTSTRAPING",
  NOT_MOUNTED = "NOT_MOUNTED",
  MOUNTING = "MOUNTING",
  UNMOUNTED = "UNMOUNTED",
  MOUNTED = "MOUNTED",
  UNMOUNTING = "UNMOUNTING",
}

export interface IInternalAppInfo extends IAppInfo {
  status: EAppStatus;
  bootstrap?: Lifecycle;
  mount?: Lifecycle;
  unmount?: Lifecycle;
}
