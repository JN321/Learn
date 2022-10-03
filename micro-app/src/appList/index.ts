import { IAppInfo } from "../types";

let appList: IAppInfo[] = [];

export const setAppList = (list: IAppInfo[]): void => {
  appList = list;
};

export const getAppList = (): IAppInfo[] => appList;
