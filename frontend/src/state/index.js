import { combineReducers } from "@reduxjs/toolkit";
import  auth  from "./Reducers/auth";
import  post  from "./Reducers/post";
import user from "./Reducers/user"

const rootReducer = combineReducers({
    auth,
    post,
    user
})

export default rootReducer;