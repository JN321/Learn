import React from "react";
import BrowserRouterCore from "./browserRouter";
import Route from "./route";
import Name from "./name";
import User from "./user";

export default function MyBrowserRouter() {
  return (
    <BrowserRouterCore>
      <Route path="/" component={Name}></Route>
      <Route path="/user" component={User}></Route>
    </BrowserRouterCore>
  );
}
