import { combineReducers } from "@reduxjs/toolkit";
import  auth  from "./Reducers/auth";
import  post  from "./Reducers/post";
import user from "./Reducers/user"
import comment from "./Reducers/comment"

const rootReducer = combineReducers({
    auth,
    post,
    user,
    comment
})

export default rootReducer;