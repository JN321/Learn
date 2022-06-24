# redux and mobx

```js
reactDOM.render(<App />, document.getElementById('app'));
fiber ->
beginWork -- function 
            -- 运行
          -- class 
            -- render  -- jsx -> createElement / _jsx() -> { children: [{},{},{}] }

completeWork 
        - reactDOM 

commitWork 
    三个mutation
```

## 状态管理和这些库的应用。
### 我们在设计一个数据的时候，要考虑哪些问题？
生命周期
- DB。随着用户的登录，就存在。而且可以持久化。
- localStorage
- sessionStorage
- project runtime
    - redux - 生命周期，是浏览器访问，直到页面刷新或关闭。
- page
- component

### 这个生命周期，还有什么？
这里的deps的生命周期，和 redux 一致。
```js
const deps = {};

function create() {
    deps.value = "hello"
}

export default create;
```
如果以上代码是一个发布订阅，是不是你的 deps 也是一样的生命周期？ 



## redux (面试问的最多 70-80%)
讲透 - 能面试遇到的东西

### createStore
- createStore: 这个API 最终返回一个 store 对象，所有的功能都在这个对象上。
- store.subscribe: 订阅state的变化，当state变化的时候会执行回调，可以多多个 subscribe， 里面的回调依次执行。
- store.dispatch: 发出action的方法，每次dispatch 一个action ，都会执行 reducer 函数，生成新的 state， 然后执行subscribe 注册的回调。
- store.getState: 返回当前的 state

### 有什么问题
多人开发的过程中，一不小心，就会把数据清空，或者勿修改了其他组件，副作用太大。
因此，我们需要制定一个 state 的 “修改计划”， 告诉store, 我的修改计划是什么
reducer : 修改store.changeState 方法，告诉他修改state的时候，按照我们的计划执行。

### 精髓1
通过 reducer 来控制对数据的修改方式和预期。

### 精髓2
处理副作用
[logger, thunk, saga]
redux-compose
```js
    export default compose(...funcs) {
        return funcs.reduce(
            (a, b) => (...args) => a(b(args))
        )
    }
    // compose([fn1, fn2, fn3])(args);
    // fn1(fn2(fn3(...args)))
    function applyMiddleware = (...middlewares) => createStore => (reducer, preloadedState) => {
        // 1. middleware 即为我们上述的中间件，第一个参数是 store
        const store = createStore(reducer, preloadedState);
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        };
         // 2. 这时候，chain 中的 item 为，接受 next 的中间件函数
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        // 3. store.dispatch 即为上述的 next 函数，在代码中，以 next(action) 进行执行
        dispatch = compose(...chain)(store.dispatch);
        // 4. 将新的 dispatch返回出去，dispatch 还是一个函数，函数的参数为
        return {
            ...store, dispatch
        }
    }
```
- applyMiddleWare 

### 精髓3
react-redux 的核心就是
- redux 是全局数据
- redux 不会触发界面更新
- react-redux， 用 Context 的 provider 和 consumer 把 redux 的 store 串了起来。

#### 实现1：
使用context 的方法，模板定义 Provider ,
类写法传递 store
```js
// index.js
import Provider from './store/Provider';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Provider.js
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Provider extends Component {

    static childContextTypes = {
        store: PropTypes.object
    }

    constructor(props, context){
        super(props, context)
        // 这里写错了。
        this.store = props.store
    }

    getChildContext() {
      return { store: this.store }
    }

  render() {
    return this.props.children
  }
}

// connect.js
import { PropTypes } from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    class Connect extends React.Component {
        componentDidMount() {
            this.context.store.subscribe(this.handleStoreChange.bind(this));
            console.log('this.comtext', this.context);
        }
        handleStoreChange(){
            this.forceUpdate()
        }
        render () {
            return (
                <div>
                    <Component
                        {...this.props}
                        {...mapStateToProps(this.context.store.getState())}
                        {...mapDispatchToProps(this.context.store.dispatch)}
                    />
                    {/* <div>{JSON.stringify(this.context.store.getState())}</div> */}
                    {/* hello */}
                </div>
            )
        }
    }
    Connect.contextTypes = {
        store: PropTypes
    }
    return Connect;
}

```

#### 实现2：

createContext
```js
// index.js
import ReduxContext from './store/context';
ReactDOM.render(
  
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>,
  document.getElementById('root')
);

// Provider.js
// 不需要

// connect
import React, { useContext, useState, useEffect } from 'react';
import ReduxContext from './context';
export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    function Connect(props) {
        const store = useContext(ReduxContext);
        const [, setCount] = useState(true);
        const forceUpdate = () => setCount(val => !val);
        useEffect(() => store.subscribe(forceUpdate), []);
        return (
            <ReduxContext.Consumer>
                {
                    store => <>
                    <Component
                        {...props}
                        {...mapStateToProps(store.getState())}
                        {...mapDispatchToProps(store.dispatch)}
                    />
                    <div>{JSON.stringify(store.getState())}</div>
                    </>
                }
            </ReduxContext.Consumer>
        )
    }
    return Connect;
}
```

## mobx (20-30%)
- Vue react 不是很喜欢用；
- mobx 源码中API太多了；
- mobx 不同的版本差异比较大；

mobx 本身也只是一个响应数据状态变更的一个库。
vue --> mutable

Proxy(store, {
    get, set
})

mobx / [redux]