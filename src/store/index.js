import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cashReducer } from "./cashReducer";
import countReducer from "./countReducer";
import { customerReducer } from "./customerReducer";
import createSagaMiddleware from "@redux-saga/core";
import { countWatcher } from "../saga/countSaga";
import userReducer from "./userReducer";
import { rootWatchers } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    cash: cashReducer,
    customers: customerReducer,
    count: countReducer,
    users: userReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(rootWatchers)