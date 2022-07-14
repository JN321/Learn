# node API

## node 内置对象

### Buffer
准确的来说，Buffer 是一种计算机中数据流结构。计算机中是以二进制的方式，进行数据存取的。
而 js 在一开始，没有文件读写能力的，就要借助 Buffer 来实现一些缓冲区的内容。
Buffer 一般用于表示固定长度的缓冲区序列。

File new Blob 

#### Buffer 的 API

##### Buffer 的声明
```js
let buf1 = Buffer.alloc(5); // 单位是字节 00000000

let buf2 = Buffer.from('麓一'); // node 中一般编码使用的是 utf-8, 所以一个汉字，是3个字节。
// e9 ba 93 
let buf3 = Buffer.from([0xe9, 0xba, 0x93]);

console.log(buf1);  // -> <Buffer 00 00 00 00 00>
console.log(buf2);  // -> <Buffer e9 ba 93 e4 b8 80>
console.log(buf3.toString()); // -> 麓
```
##### Buffer 和 String 的转换
```js
buf.toString(buffer); 
Buffer.from(string);
```

##### Buffer 的拼接
- copy
```js
let buf1 = Buffer.from('麓一');
let buf2 = Buffer.from('麓一');

let bigBuffer = Buffer.alloc(6); // 分配6个字节

// 第一个0, 表示从0这个位置开始拷贝
// 第二和第三个数字，表示拷贝从几到几的长度。
buf1.copy(bigBuffer, 0, 0, 2);
buf2.copy(bigBuffer, 2, 2, 6);

console.log(bigBuffer.toString());

```
- concat
```js
console.log(Buffer.from('麓一'));
// <Buffer e9 ba 93 e4 b8 80>

let buf1 = Buffer.from([0xe9, 0xba]);
let buf2 = Buffer.from([0x93, 0xe4, 0xb8, 0x80]);

let bigBuffer = Buffer.concat([buf1, buf2], 6);

console.log(bigBuffer.toString());
```

##### Buffer 的截取
```js

let buf1 = Buffer.from('麓一老师');
let buf2 = buf1.slice(0, 6);

console.log(buf2.toString());
```

##### Buffer 的类型判断
```js
Buffer.isBuffer(buf);
```

#### Buffer 进行文件读写
```js
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../package.json'), 'utf-8', function(err, data) {
    fs.writeFile(path.resolve(__dirname, '../luyi.json'), data, function(err) {
        console.log('写入成功');
    })
});
```

### Stream 
流
- 防止淹没可用内存。
Buffer 不适合大文件的读取，如果是比较小的文件可以。
但是对于大文件，我们就需要使用流。

```js
const buf = Buffer.alloc(3);

// chomd -R 777
fs.open(path.resolve(__dirname, 'package.json'), 'r', 777, function(err, fd) { // fd文件描述符
    fs.open(path.resolve(__dirname, 'copy.json'), 'w', function(err, wfd) {
        // console.log(fd); // 是一个数字类型，用完需要关闭掉
        function close(){
            fs.close(fd,()=>{})
            fs.close(wfd,()=>{})
        }
        function next() {
            // buf 写入到哪个buffer中，从buffer的哪个位置开始写入3个字节，从文件的第0个位置开始读取
            fs.read(fd, buf, 0, 3, 0, function(err, bytesRead) { // bytesRead 实际读取到的个数，这个个数 不一定是3 ，可能会小于3
                console.log(bytesRead);

                if(bytesRead == 0){
                   return close(); 
                }
                // 写入到文件中，从buffer的第0个位置写入3个字节，写入到文件的第0个位置
                fs.write(wfd, buf, 0, 3, 0, function(err, bytesWritten) {
                    next()
                })
            })
        }
        next();
    })
})
```
#### fs 创建可读流。
```js
const fs = require('fs');
const path = require('path');

const res = fs.createReadStream(path.resolve(__dirname, '../package.json'), {
    flags: 'r',
    start: 0,
    end: 20,
    highWaterMark: 5, // 默认是 64K
    autoClose: true,
    emitClose: true,
});

let arr = [];

res.on('open', function(fd) {
    console.log('fd', fd);
});

res.on('data', function(data) {
    console.log('data', data);
    arr.push(data);
});

res.on('end', function() {
    console.log('end', Buffer.concat(arr).toString());
});

res.on('close', function() {
    console.log('close');
});

res.on('error', function() {
    console.log('error');
});
```

#### 文件压缩
```js
const fs = require('fs');
const path = require('path');

const zlib = require('zlib');

fs.createReadStream(path.resolve(__dirname, '../package.json'))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.resolve(__dirname, '../package.json.gz')));
```

### Event
```js
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

```

### cluster
```js
const fs = require('fs');
const path = require('path');
const http = require('http');
// 子进程，开子进程。

const os = require('os'); // operating system
const { default: cluster } = require('cluster');

const cpu_num = os.cpus();

if(cluster.isMaster) {
    for(let i = 0; i <cpu_num.length; i++) {
        cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        res.end('childPid', process.pid);
    }).listen(3000);
};

```

## 事件循环

浏览器中，一般情况下： messageBump
- 宏任务
    - Input events
    - keyPress
    - timers
- 微任务
    - promise / await async / generator

- frame
    - resize, scroll, 动画，媒体查询器。

- RAF
    - requestAnimationFrame callbacks
    - IntersectionObserver

- Layout 
    - ResizeObserver

- Paint 
    - 合成

- RequestIdleCallback


 -- 微任务 -- RAF -- Layout -- RequestIdleCallback;


Node 的事件循环：libuv

```
             同步的代码
                 |
     process.nextTick / promise...
                 |
   ┌───────────────────────────┐
┌─>│           timers          │ 定时器： setTimeout / setInterval
│  └─────────────┬─────────────┘
|    process.nextTick / promise...
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ 执行延迟到下一个循环迭代的I/O回调
│  └─────────────┬─────────────┘
|    process.nextTick / promise...
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ 系统内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
|    process.nextTick / promise...
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
|    process.nextTick / promise...
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │ setImmediate 
│  └─────────────┬─────────────┘
|    process.nextTick / promise...
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ 关闭回调函数
   └───────────────────────────┘

```

- 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
- 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- 轮询：检索新的 I/O 事件; 执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
- 检测：setImmediate() 回调函数在这里执行。
- 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

nextTick 的优先级？

script start.
async1 started
async2
promise1
promise2
script end

nextTick
async end
promise.then

setTimeout0
setImmediate
setTimeout1

浏览器事件循环：


《深入浅出 node.js》 - 朴灵
《狼书》 - 狼叔

koa, express, egg.