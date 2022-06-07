// init
(function () {
  // model
  var myapp = {}; // 创建这个应用对象
  myapp.Model = function () {
    var val = 0;
    this.add = function (v) {
      if (val < 100) val += v;
    };
    this.sub = function (v) {
      if (val > 0) val -= v;
    };
    this.getVal = function () {
      return val;
    };
    var self = this,
      views = [];
    // 订阅
    this.register = function (view) {
      views.push(view);
    };
    // 通知
    this.notify = function () {
      for (var i = 0; i < views.length; i++) {
        views[i].render(self);
      }
    };
  };

  // view
  myapp.View = function (controller) {
    var $num = document.getElementById("num"),
      $incBtn = document.getElementById("#increase"),
      $decBtn = document.getElementById("#decrease");

    this.render = function (model) {
      $num.innerHTML = model.getVal() + "rmb";
    };
    /*  绑定事件  */
    $incBtn.addEventListener("click", controller.increase);
    $decBtn.addEventListener("click", controller.decrease);
  };

  // controller
  myapp.Controller = function () {
    var model = null,
      view = null;
    this.init = function () {
      /* 初始化Model和View */
      model = new myapp.Model();
      view = new myapp.View(this);
      /* View向Model注册，当Model更新就会去通知View啦 */
      model.register(view);
      model.notify();
    };
    /* 让Model更新数值并通知View更新视图 */
    this.increase = function () {
      model.add(1);
      model.notify();
    };
    this.decrease = function () {
      model.sub(1);
      model.notify();
    };
  };

  var controller = new myapp.Controller();
  controller.init();
})();
