function creatStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  // 订阅函数
  function subscribe(listener) {
    listeners.push(listener);
  }

  // 发布通知
  // reducer的作用：在dispatch中不直接修改数据，而是通过action告知dispatch如何修改数据。
  function dispatch(action) {
    state = reducer(state, action);
    // state = newState;

    // 发布
    listeners.forEach((listener) => listener());
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}

function combineReducers(reducers) {
  // reducers {counter: counterReducers, info: infoReducers}

  const keys = Object.keys(reducers);
  // 合并成一个大的reducer
  return function combination(state = {}, action) {
    const nextState = {};
    // 遍历一遍所有的reducers 整合成一个新的state
    keys.forEach((key) => {
      const reducer = reducers[key];
      const prev = state[key];
      const next = reducer(prev, action);
      nextState[key] = next;
    });

    console.log("nextState", nextState);
    return nextState;
  };
}

///////////////////////// test /////////////////////////////

const initState = {
  counter: { count: 0 },
  info: { age: 18 },
};

// 组合多个reducer
function counterReducer(state, action) {
  switch (action.type) {
    case "ADD_COUNT":
      return { count: state.count + 1 };
    case "MINUS_COUNT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function infoReducer(state, action) {
  switch (action.type) {
    case "ADD_AGE":
      return { age: state.age + 1 };
    case "MINUS_AGE":
      return { age: state.age - 1 };
    default:
      return state;
  }
}

const reducers = combineReducers({
  counter: counterReducer,
  info: infoReducer,
});

console.log("reducers", reducers);

const store = creatStore(reducers, initState);

store.subscribe(() => {
  console.log("订阅者1", store.getState());
});

store.subscribe(() => {
  console.log("订阅者2", store.getState());
});

store.dispatch({ type: "ADD_COUNT" });
setTimeout(() => {
  store.dispatch({ type: "ADD_AGE" });
}, 2000);
