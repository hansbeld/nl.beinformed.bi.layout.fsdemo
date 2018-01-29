// @flow
/* global process */
import {
  applyMiddleware,
  compose,
  combineReducers,
  createStore as createReduxStore
} from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, routerReducer } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

import { BASE } from "beinformed/constants/Constants";

import modularui from "beinformed/redux/middleware/modularui";

import { createReducer } from "beinformed/redux/reducers";

const configureStore = (initialState: Object = {}, fromServer: boolean) => {
  const history = fromServer
    ? createMemoryHistory()
    : createBrowserHistory({
        basename: BASE
      });

  const middleware = [modularui, routerMiddleware(history), thunk];

  const enhancers = [];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production") {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createReduxStore(
    combineReducers({
      ...createReducer(),
      router: routerReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );

  return { history, store };
};

export default configureStore;
