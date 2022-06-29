import { combineReducers, creatStore } from "./redux";
// import { combineReducers, legacy_createStore as creatStore } from "redux";

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

const store = creatStore(reducers, initState);

export default store;
