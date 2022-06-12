import { useState, useEffect, createContext } from "react";

export const RouterComponent = createContext();
// 为什么需要HistoryComponent？提供给组件获取push、goback等方法的。
export const HistoryComponent = createContext();

export default function BrowserRouterCore(props) {
  const [path, setPath] = useState(() => {
    const { pathname } = window.location;
    console.log("pathnamessss", pathname);
    return pathname;
  });

  const handlePath = () => {
    const { pathname } = window.location;
    setPath(pathname);
  };

  const push = (path) => {
    setPath(path);
    window.history.pushState({ path }, null, path);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    // 监听用户点击浏览器的前进，后退按钮跳转页面
    window.addEventListener("popstate", handlePath);
    return () => {
      window.removeEventListener("popstate", handlePath);
    };
  }, []);

  return (
    <RouterComponent.Provider value={{ path, push, goBack }}>
      <HistoryComponent.Provider value={{ push, goBack }}>
        {props.children}
      </HistoryComponent.Provider>
    </RouterComponent.Provider>
  );
  // return props.children;
}
