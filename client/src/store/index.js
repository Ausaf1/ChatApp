import { createStore, compose, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { messangerReducer } from "./reducers/messangerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  messanger: messangerReducer,
});

const middleware = [thunkMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
