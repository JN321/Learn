import { useContext } from "react";
import { RouterComponent } from "./browserRouter";

export default function Route(props) {
  const { path } = useContext(RouterComponent);
  const { path: routePath, component: RouteComponent } = props;
  return routePath === path ? <RouteComponent /> : null;
}
