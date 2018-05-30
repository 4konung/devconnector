import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {};
const middleware = [thunk];

const enhancedComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  enhancedComposer(applyMiddleware(...middleware))
);

export default store;
