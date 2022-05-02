import { combineReducers } from "@reduxjs/toolkit";
import  auth  from "./Reducers/auth";

const rootReducer = combineReducers({
    auth
})

export default rootReducer;