/**
 * 资源的加载
 * qiankun中是通过 import-html-entry 实现了对资源的加载
 */
import { IInternalAppInfo } from "../types";
import { importEntry } from "import-html-entry";

export const loadHtml = async (app: IInternalAppInfo) => {
  const { entry, container } = app;

  const { template, getExternalStyleSheets, getExternalScripts } =
    await importEntry(entry);

  const dom = document.querySelector(container);
  if (!dom) {
    throw new Error("容器不存在");
  }
  dom.innerHTML = template;

  await getExternalStyleSheets(); // 样式表

  const jsCode = await getExternalScripts(); // 资源

  console.log("jsCode ------>", jsCode);

  jsCode.forEach((script) => {
    const lifecycle = runJS(script, app);
    if (lifecycle) {
      app.bootstrap = lifecycle.bootstrap;
      app.mount = lifecycle.mount;
      app.unmount = lifecycle.unmount;
    }
  });
};

const runJS = (script: string, app: IInternalAppInfo) => {
  // 形成子应用沙箱
};
