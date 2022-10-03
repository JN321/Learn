import Canvas from "../../utils/canvas";

class ShapeCanvas extends Canvas {
  constructor() {
    super();
    this.shapeWidth = 100;
    this.shapeHeight = 100;
    this.shapeCount = 6;
    this.shape = [];
    this.ctx = this.getContext("2d");
  }

  calculate() {
    let { width, height, shapeCount, shapeHeight, shape, shapeWidth } = this;

    // 水平放置最大个数
    let maxHorizontalCount = 4;
    // 最小间距
    let mainMargin = 20;
    // 水平放置个数
    let horizontalCount = Math.min(
      Math.floor(width / shapeWidth),
      maxHorizontalCount
    );

    let mergin = (width - horizontalCount * shapeWidth) / (horizontalCount + 1);
    let verticalCount = Math.ceil(shapeCount / horizontalCount);

    while (margin < mainMergin && horizontalCount > 1) {
      horizontalCount -= 1;
      verticalCount = Math.ceil(shapeCount / horizontalCount);
      mergin = (width - horizontalCount * shapeWidth) / (horizontalCount + 1);
    }

    let top =
      (height - shapeHeight * verticalCount - margin * (verticalCount - 1)) / 2;

    // 做布局计算保存
    for (let i = 0; i < verticalCount; i++) {
      for (let j = 0; j < horizontalCount; j++) {
        // 每个元素绘制
        if (shapes.length >)
      }
    }
  }

  render(container) {
    super.render(container);

    // 计算图形内容
    this.calculate();

    // 绘制图形
    this.drawShapes();
  }
}
