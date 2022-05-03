import { combineReducers } from "@reduxjs/toolkit";
import  auth  from "./Reducers/auth";
import  post  from "./Reducers/post";

const rootReducer = combineReducers({
    auth,
    post
})

export default rootReducer;