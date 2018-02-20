import React from "react";
import { Route, Redirect } from "react-router-dom";

import Main from "beinformed/components/Main/Main";

import ApplicationHeader from "fsdemo/components/ApplicationHeader/ApplicationHeader";
import ApplicationFooter from "fsdemo/components/ApplicationFooter/ApplicationFooter";

import Routes from "beinformed/components/Routes/Routes";
import MainRoutes from "beinformed/components/Routes/MainRoutes";
import ModalRoutes from "beinformed/components/Routes/ModalRoutes";
import Form from "beinformed/containers/Form/Form";

import HomePage from "fsdemo/components/HomePage/HomePage";
import SignIn from "fsdemo/containers/SignIn/SignIn";
import RegisterForOnlineBanking from "fsdemo/containers/RegisterForOnlineBanking/RegisterForOnlineBanking";
import Account from "fsdemo/containers/Account/Account";
import MortgageInstruments from "fsdemo/components/MortgageInstruments/MortgageInstruments";
import ApplyForMortgage from "fsdemo/containers/ApplyForMortgage/ApplyForMortgage";
import CheckEligibility from "fsdemo/containers/CheckEligibility/CheckEligibility";
import ApplyForMortgageInformation from "../ApplyForMortgage/ApplyForMortgageInformation";

import { LOGIN_PATH } from "beinformed/constants/Constants";

import "./Application.scss";

const Application = ({ application, locale }) =>
  application ? (
    <Main>
      <div className="container">
        <ApplicationHeader application={application} />

        <div className="application-body">
          <Routes>
            <MainRoutes>
              <Route path="/" exact component={HomePage} />

              <Route path={LOGIN_PATH} exact component={SignIn} />
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
            </MainRoutes>
            <ModalRoutes>
              <Route path={LOGIN_PATH} exact component={SignIn} />
              <Route
                path="/mortgage-calculators/calculators/decide-mortgage-eligible"
                component={CheckEligibility}
              />
            </ModalRoutes>
          </Routes>
        </div>
        <ApplicationFooter />
      </div>
    </Main>
  ) : null;

export default Application;
