import "./style.less";

import { getAge, getName } from "./unit";
getAge();
getName();

const app = document.getElementById("app");
const div = document.createElement("div");
div.innerHTML = "hello zhouwen";
app.appendChild(div);
