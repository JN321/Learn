// 手写一个发布订阅

function EventEmitter() {
    this._events = {};
}

EventEmitter.prototype.on = function(eventName, callback) {
    if(!this._events) this._events = {};
    let eventCbList = this._events[eventName] || (this._events[eventName] = []);
    // 
    eventCbList.push(callback);
    // return () => this.off(eventName, callback);
};

EventEmitter.prototype.emit = function(eventName, ...rest) {
    this._events[eventName] && this._events[eventName].forEach(cb => cb(...rest));
};

EventEmitter.prototype.off = function(eventName, callback) {
    if(!this._events) this._events = {};
    if(this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(item => (item != callback) && (item.cb !== callback));
    }
};

// 我只执行一次。
EventEmitter.prototype.once = function(eventName, callback) {
    const once = (...rest) => {
        callback(...rest);
        this.off(eventName, once);
    }

    once.cb = callback;
    this.on(eventName, once);
}



// 

const e = new EventEmitter();
e.on('data', function(msg) {
    console.log('hello' + msg);
});

const handle = function(msg) {
    console.log('hello2' + msg);

}
e.once('data', handle);
setTimeout(() => {
    e.emit('data', 'msg');
    // e.off('data', handle);
    e.emit('data', 'msg');

},500)