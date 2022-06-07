/**
 * 发布订阅模式
 * 当主题的状态发生改变后，会通知所有的观察者。
 */
class Subject {
  constructor(name) {
    this.name = name;
    this.state = "padding";
    this.observers = [];
  }
  setState(state) {
    this.state = state;
    this.observers.forEach((observer) => {
      observer.update(state);
    });
  }
  append(...observer) {
    this.observers.push(...observer);
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(state) {
    console.log(`观察者${this.name}看到的状态为:`, state);
  }
}

const father = new Observer("爸爸");
const mather = new Observer("妈妈");

const baby = new Subject("宝宝");
baby.append(father, mather);
baby.setState("哭闹");
