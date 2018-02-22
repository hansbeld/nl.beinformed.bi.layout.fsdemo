// @flow
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { push } from "react-router-redux";
import { StaticRouter as Router } from "react-router-dom";

import Helmet from "react-helmet";
import serialize from "serialize-javascript";

import RootRoute from "beinformed/containers/ModularUI/RootRoute";

import htmlpage from "beinformed/server/htmlpage";
import Application from "beinformed/containers/Application/Application";
import ErrorBoundary from "beinformed/components/Error/ErrorBoundary";
import ErrorPage from "beinformed/components/Error/ErrorPage";

import createStore from "beinformed/redux/store";

import render from "beinformed/server/render";

import Locales, { availableLocales } from "beinformed/i18n/Locales";
import { setLocales } from "beinformed/containers/I18n/actions";

import {
  getFullRequestHref,
  getPreferredLocale
} from "beinformed/utils/server/requestInformation";

type serverProps = {
  request: HttpServletRequestJava,
  ApplicationComponent?: any,
  availLocales?: Array<Object>
};

const dehydrateState = state => ({
  ...state,
  modularui: Object.keys(state.modularui).reduce((obj, key) => {
    obj[key] = {
      status: state.modularui[key].status,
      model: state.modularui[key].model.dehydrate()
    };

    return obj;
  }, {})
});

const server = ({
  request,
  ApplicationComponent = <Application />,
  availLocales = availableLocales
}: serverProps) => {
  // Set global context path, received from request on server
  global.CONTEXT_PATH = request.getContextPath();
  __webpack_public_path__ = global.CONTEXT_PATH; // eslint-disable-line camelcase, no-global-assign

  const { store } = createStore({}, true);
  const context = {};

  const requestHref = getFullRequestHref(request);

  const locales = new Locales(availLocales);

  store.dispatch(setLocales(locales, getPreferredLocale(request, locales)));
  store.dispatch(push(requestHref.toString()));

  return render(store, () =>
    renderToString(
      <Provider store={store}>
        <ErrorBoundary>
          <Router
            basename={global.CONTEXT_PATH}
            location={{
              pathname: requestHref.path,
              search: requestHref.querystring
                ? `?${requestHref.querystring}`
                : "",
              hash: requestHref.hash ? `#${requestHref.hash}` : ""
            }}
            context={context}
          >
            <RootRoute>{ApplicationComponent}</RootRoute>
          </Router>
        </ErrorBoundary>
      </Provider>
    )
  )
    .then(appHTML => {
      const state = store.getState();

      if (state.error) {
        throw state.error;
      }

      state.contextPath = request.getContextPath();

      return htmlpage(
        request.getContextPath(),
        appHTML,
        Helmet.renderStatic(),
        serialize(dehydrateState(state))
      );
    })
    .catch(e =>
      htmlpage(
        request.getContextPath(),
        renderToString(
          <ErrorPage
            errorMessage={e.message}
            errorResource={e.fileName}
            errorLine={e.lineNumber}
            errorStack={e.stack}
          />
        )
      )
    );
};

export default server;
