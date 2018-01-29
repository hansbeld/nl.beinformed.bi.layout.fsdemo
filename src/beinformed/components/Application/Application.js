// @flow
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import ApplicationModel from "beinformed/models/application/ApplicationModel";

import Home from "beinformed/components/Home/Home";
import Tab from "beinformed/containers/Tab/Tab";
import FormModals from "beinformed/containers/Form/FormModals";
import ModelCatalog from "beinformed/containers/ModelCatalog/ModelCatalog";
import SignIn from "beinformed/containers/SignIn/SignIn";
import SignOut from "beinformed/containers/SignOut/SignOut";
import NotFound from "beinformed/components/NotFound/NotFound";
import ChangePassword from "beinformed/containers/ChangePassword/ChangePassword";

import Notification from "beinformed/containers/Notification/Notification";
import ProgressIndicator from "beinformed/containers/ProgressIndicator/ProgressIndicator";

import HTMLHead from "beinformed/components/HTMLHead/HTMLHead";
import ApplicationHeader from "beinformed/components/ApplicationHeader/ApplicationHeader";

import NoScript from "beinformed/components/NoScript/NoScript";

import {
  LOGIN_PATH,
  LOGOUT_PATH,
  CHANGEPASSWORD_PATH
} from "beinformed/constants/Constants";

import type { Location, RouterHistory } from "react-router-dom";

export type ApplicationProps = {
  application: ApplicationModel,
  locale: string,
  location: Location,
  history: RouterHistory
};

/**
 * Renders application
 */
class Application extends Component<ApplicationProps> {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps: ApplicationProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location, application, locale } = this.props;

    const isModal = Boolean(
      location.state &&
        location.state.modal &&
        this.previousLocation !== location
    );

    return application ? (
      <div className="application">
        <HTMLHead title={application.label} locale={locale} />

        <Notification />

        <ApplicationHeader application={application} />

        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/" exact component={Home} />
          <Route path="/Webapp" exact component={Home} />
          <Route path={LOGIN_PATH} exact component={SignIn} />
          <Route path={LOGOUT_PATH} exact component={SignOut} />
          <Route path={CHANGEPASSWORD_PATH} exact component={ChangePassword} />
          <Route path="/modelcatalog" component={ModelCatalog} />
          <Route path={application.tabs.routePath} component={Tab} />
          <Route component={NotFound} />
        </Switch>

        <ProgressIndicator />

        {isModal && (
          <Switch>
            <Route path={LOGIN_PATH} exact component={SignIn} />
            <Route
              path={CHANGEPASSWORD_PATH}
              exact
              component={ChangePassword}
            />
            <Route>
              <FormModals />
            </Route>
          </Switch>
        )}

        <NoScript />
      </div>
    ) : null;
  }
}

export default Application;
