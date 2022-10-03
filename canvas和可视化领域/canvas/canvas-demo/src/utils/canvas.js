/**
 * 通用的 canvas
 */

import { WIDTH, HEIGHT } from "./constant";

export class Canvas {
  constructor() {
    this.el = document.createElement("canvas");
  }

  initCanvasSize(width, height) {
    // 需要同步的设置尺寸
    this.el.width = width;
    this.el.height = height;
    this.width = width;
    this.height = height;
  }

  render(container) {
    this.container = container;
    let { width, height } = container.getBoundingClientRect();

    // 初始化自己画布的大小
    this.initCanvasSize(width || WIDTH, height || HEIGHT);

    // 内容处理 清空节点内容 -> 加入canvas节点
    this.container.innerHTML = "";
    this.container.appendChild(this.el);
  }
}
