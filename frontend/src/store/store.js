import { applyMiddleware, createStore } from "redux";
import rootReducer from "../state/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

