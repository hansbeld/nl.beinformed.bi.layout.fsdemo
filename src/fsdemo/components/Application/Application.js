// @flow
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ApplicationModel from "beinformed/models/application/ApplicationModel";

import Tab from "beinformed/containers/Tab/Tab";
import FormModals from "beinformed/containers/Form/FormModals";
import ModelCatalog from "beinformed/containers/ModelCatalog/ModelCatalog";
import SignOut from "beinformed/containers/SignOut/SignOut";
import NotFound from "beinformed/components/NotFound/NotFound";
import ChangePassword from "beinformed/containers/ChangePassword/ChangePassword";

import Notification from "beinformed/containers/Notification/Notification";
import ProgressIndicator from "beinformed/containers/ProgressIndicator/ProgressIndicator";

import HTMLHead from "beinformed/components/HTMLHead/HTMLHead";

import NoScript from "beinformed/components/NoScript/NoScript";

import Form from "beinformed/containers/Form/Form";

// Custom components
import SignIn from "fsdemo/containers/SignIn/SignIn";
import RegisterForOnlineBanking from "fsdemo/containers/RegisterForOnlineBanking/RegisterForOnlineBanking";
import Account from "fsdemo/containers/Account/Account";
import MortgageInstruments from "fsdemo/components/MortgageInstruments/MortgageInstruments";
import ApplyForMortgage from "fsdemo/containers/ApplyForMortgage/ApplyForMortgage";

import CheckEligibility from "fsdemo/containers/CheckEligibility/CheckEligibility";
import ApplyForMortgageInformation from "../ApplyForMortgage/ApplyForMortgageInformation";

import ApplicationHeader from "fsdemo/components/ApplicationHeader/ApplicationHeader";
import ApplicationFooter from "fsdemo/components/ApplicationFooter/ApplicationFooter";

import HomePage from "fsdemo/components/HomePage/HomePage";

import {
  LOGIN_PATH,
  LOGOUT_PATH,
  CHANGEPASSWORD_PATH
} from "beinformed/constants/Constants";

import "../../fsdemo.scss";
import "./Application.scss";

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

        <div className="container">
          <ApplicationHeader application={application} />

          <div className="application-body">
            <Switch location={isModal ? this.previousLocation : location}>
              <Route path="/" exact component={HomePage} />
              <Route path="/Webapp" exact component={HomePage} />

              <Route path={LOGIN_PATH} exact component={SignIn} />
              <Route path={LOGOUT_PATH} exact component={SignOut} />
              <Route
                path={CHANGEPASSWORD_PATH}
                exact
                component={ChangePassword}
              />

              <Route
                path="/register-for-online-banking"
                component={RegisterForOnlineBanking}
              />
              <Route
                path="/mortgage-calculators"
                render={() => <MortgageInstruments locale={locale} />}
              />

              <Route path="/accounts/account/:accountid" component={Account} />
              <Redirect from="/accounts" exact to="/accounts/customer" />

              <Route
                path="/apply-for-a-mortgage/mortgage-application/:id"
                component={ApplyForMortgage}
              />
              <Route
                path="/apply-for-a-mortgage/applications/create-application-form"
                component={Form}
              />
              <Redirect
                from="/apply-for-a-mortgage"
                to="/apply-for-a-mortgage/applications/create-application-form"
              />

              <Route
                path="/apply-for-mortgage-information"
                component={ApplyForMortgageInformation}
              />

              <Route path="/modelcatalog" component={ModelCatalog} />
              <Route path={application.tabs.routePath} component={Tab} />
              <Route component={NotFound} />
            </Switch>
          </div>

          <ApplicationFooter />
        </div>

        <ProgressIndicator />

        {isModal && (
          <Switch>
            <Route path={LOGIN_PATH} exact component={SignIn} />
            <Route
              path={CHANGEPASSWORD_PATH}
              exact
              component={ChangePassword}
            />
            <Route
              path="/mortgage-calculators/calculators/decide-mortgage-eligible"
              component={CheckEligibility}
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
