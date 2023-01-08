import {stateReducer} from "./reducer"
import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

export const store = createStore(stateReducer, composeWithDevTools())