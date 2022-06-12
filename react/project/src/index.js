import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App'; // 基础router练习
// import MenuRoute from "./router_practice"; // 基础router练习
import MyBrowserRouter from "./myBrowserRouter/index"; // 实现一个简易的 BrowerRouter
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <MenuRoute /> */}
    <MyBrowserRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
