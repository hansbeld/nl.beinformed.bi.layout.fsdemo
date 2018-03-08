// @flow
import React from "react";
import { hydrate } from "react-dom";
import setImmediate from "setimmediate";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import RootRoute from "beinformed/components/Routes/RootRoute";

import Cache from "beinformed/utils/browser/Cache";
import FetchError from "beinformed/utils/fetch/FetchError";

import { showXHRErrorNotification } from "beinformed/containers/Notification/actions";
import { handleError } from "beinformed/containers/Error/actions";

import Application from "beinformed/containers/Application/Application";
import ErrorBoundary from "beinformed/components/Error/ErrorBoundary";

import createStore from "beinformed/redux/store";
import rehydrate from "beinformed/client/rehydrate";

import { loginSuccess } from "beinformed/containers/SignIn/actions";
import { BASE } from "beinformed/constants/Constants";

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

/*
 * Enable React Axe for a11y test (manual): @see https://github.com/dylanb/react-axe
 * import ReactDOM from 'react-dom';
 * import axe from 'react-axe';
 *
 * axe(React, ReactDOM, 1000);
 */

type clientProps = {
  ApplicationComponent?: any
};

/*
 * deserialize serialized data from the server to provide a smooth dehydration.
 */
const parseDataToJSON = data => {
  try {
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Error parsing content ${data}`);
  }
};

/**
 * Mount the webapplication to the DOM, used client side when JavaScript is enabled.
 */
const client = ({ ApplicationComponent = <Application /> }: clientProps) => {
  const dataElement = document.querySelector(
    'script[type="application/json"][data-app-state="app-json"]'
  );
  if (!dataElement) {
    throw new Error("Error loading state, json not found");
  } else if (dataElement.textContent.trim() === "") {
    return;
  }
  const data = parseDataToJSON(dataElement.textContent);

  // Set global context path, received from request on server
  global.CONTEXT_PATH = data.contextPath;
  __webpack_public_path__ = global.CONTEXT_PATH; // eslint-disable-line camelcase, no-global-assign
  delete data.contextPath;

  // remove all resources from cache
  Cache.clear("^res:");

  const { history, store } = createStore(rehydrate(data), false);

  if (data && data.error && data.error.name) {
    const error = new FetchError(data.error.response, null);
    store.dispatch(handleError(error));
  }

  if (Cache.getItem("auth")) {
    store.dispatch(loginSuccess());
  }

  window.onunhandledrejection = event => {
    if (event.detail) {
      return setImmediate(() => {
        const errorMessage = event.detail.reason.message.toString();

        store.dispatch(showXHRErrorNotification(errorMessage));
        throw event.detail.reason;
      });
    }

    return event;
  };

  if (document.body) {
    document.body.className = "js";
  }

  window.addEventListener("DOMContentLoaded", () => {
    hydrate(
      <Provider store={store}>
        <ErrorBoundary>
          <ConnectedRouter history={history} basename={BASE}>
            <RootRoute>{ApplicationComponent}</RootRoute>
          </ConnectedRouter>
        </ErrorBoundary>
      </Provider>,
      document.getElementById("application")
    );
  });
};

export default client;
