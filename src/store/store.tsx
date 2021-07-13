import {combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import {postReducer} from "./post-reducer";

export type AppRootState = ReturnType <typeof rootReducer>
export const rootReducer = combineReducers({
    post:postReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
