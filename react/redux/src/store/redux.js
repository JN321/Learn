export function createStore(reducer, initState) {
    let state = initState;
    let listeners = [];

    // 订阅函数的实现
    function subscribe(listener) {
        listeners.push(listener);
    }

    // 发布通知
    // 我不让你在 dispatch 的时候，修改数据
    // 我只让你告诉我，在 dispatch 的时候，怎么修改数据
    function dispatch(action) {
        // 这句话
        // 为什么说，react 、 redux 是一个 immutable -> 给一个新的state.
        // currentState = reducer()
        state = reducer(state, action);
        // 发布
        for(let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    dispatch({type: Symbol()})

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

export function combineReducers(reducers) {
    // {counter: counterReducer, info: infoReducer}
    // -> ["counter", "info"]
    const keys = Object.keys(reducers);

    return function combination(state = {}, action) {
        const nextState = {};
        // 遍历一遍所有的reducers ，整合成一个新的 state
        for(let i = 0; i < keys.length; i++) {
            // i=0
            const key = keys[i];
            // counterReducer
            const reducer = reducers[key]
            // {count:0}
            const prev = state[key];
            // action 为ADD_COUNT next ->{count:1}
            const next = reducer(prev, action);
            // nextState = {counter: {count:1}}
            nextState[key] = next;
        }

        return nextState;
    }
}
//////////////////////////////////  test /////////////////////////////////

// store.subscribe( () => {
//     console.log("我是订阅者1", store.getState());
// });
// store.subscribe( () => {
//     console.log("我是订阅者2", store.getState());
// });

// setTimeout(() => {
//     store.dispatch({type: 'ADD_COUNT'});
// }, 500)

// setTimeout(() => {
//     store.dispatch({type: 'ADD_COUNT'});
// }, 1000)


