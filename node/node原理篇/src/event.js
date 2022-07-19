// 手写一个发布订阅
function EventEmitter() {
  this._events = {};
}
EventEmitter.prototype.on = function (name, cb) {
  if (!this._events) this._events = {};
  if (!this._events[name]) this._events[name] = [];
  this._events[name].push(cb);
};

EventEmitter.prototype.emit = function (name, ...res) {
  if (!this._events[name]) return false;
  this._events[name].forEach((cb) => cb(...res));
};

EventEmitter.prototype.off = function (name, cb) {
  if (!this._events[name]) return false;
  this._events[name] = this._events[name].filter(
    (callback) => callback !== cb && callback.callback !== cb
  );
};

EventEmitter.prototype.once = function (name, cb) {
  const once = (...res) => {
    cb(...res);
    this.off(name, once);
  };
  cb.callback = cb;
  this.on(name, once);
};

//

const e = new EventEmitter();
// e.on("data", function (msg) {
//   console.log("hello" + msg);
// });

const handle = function (msg) {
  console.log("hello2" + msg);
};
e.once("data", handle);
setTimeout(() => {
  e.emit("data", "msg");
  // e.off('data', handle);
  e.emit("data", "msg");
}, 500);
