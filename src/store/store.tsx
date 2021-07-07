import {combineReducers, createStore } from "redux";
import {postReducer} from "./post-reducer";

export type AppRootState = ReturnType <typeof rootReducer>
export const rootReducer = combineReducers({
    post:postReducer
})
export const store = createStore(rootReducer)
