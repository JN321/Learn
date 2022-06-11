(function () {
  const myApp = {};
  myApp.model = function () {
    let num = 0;
    let views = [];
    this.add = function () {
      num += 1;
    };
    this.sub = function () {
      num -= 1;
    };
    this.getData = function () {
      return num;
    };
    // 收集/订阅
    this.append = function (view) {
      views.push(view);
    };
    // 通知
    this.notify = function () {
      views.forEach((v) => {
        v.render(this.getData());
      });
    };
  };

  myApp.view = function (controller) {
    const num = document.getElementById("num");
    const addbtn = document.getElementById("add");
    const subbtn = document.getElementById("subtract");
    /*  绑定事件  */
    addbtn.addEventListener("click", controller.increase);
    subbtn.addEventListener("click", controller.subtract);

    this.render = function (value) {
      num.innerHTML = value;
    };
  };
  // controller
  myApp.controller = function () {
    let model = "",
      view = "";
    this.init = function () {
      /* 初始化Model和View */
      model = new myApp.model();
      view = new myApp.view(this);
      /* View向Model注册，当Model更新就会去通知View啦 */
      model.append(view);
      model.notify();
    };
    /* 让Model更新数值并通知View更新视图 */
    this.increase = function () {
      model.add();
      model.notify();
    };
    this.subtract = function () {
      model.sub();
      model.notify();
    };
  };

  const app = new myApp.controller();
  app.init();
})();
