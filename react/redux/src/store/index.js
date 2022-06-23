import { combineReducers, createStore } from "./redux"
import { applyMiddleware } from 'redux';
import ReduxLogger from 'redux-logger';
// import { combineReducers, legacy_createStore as createStore } from "redux"

let initState = {
    counter: { count: 0},
    info: { age: 18}
}

function counterReducer(state, action) {
    switch(action.type) {
        case "ADD_COUNT":
            return {count: state.count + 1}
        case "MINUS_COUNT":
            return {count: state.count - 1}
        default:
            return state
    }
}

function infoReducer(state, action) {
    switch(action.type) {
        case "ADD_AGE":
            return {age: state.age + 1}
        case "MINUS_AGE":
            return {age: state.age - 1}
        default:
            return state
    }
}

const reducers = combineReducers({
    counter: counterReducer,
    info: infoReducer,
})

const store = createStore(reducers, initState);

export default store;