// @flow
import React from "react";
import { get } from "lodash";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "beinformed/components/Home/Home";
import Tab from "beinformed/containers/Tab/Tab";
import ModelCatalog from "beinformed/containers/ModelCatalog/ModelCatalog";
import Form from "beinformed/containers/Form/Form";

import SignOut from "beinformed/containers/SignOut/SignOut";
import SignIn from "beinformed/containers/SignIn/SignIn";
import UserProfile from "beinformed/components/UserProfile/UserProfile";

import CheckForWebapp from "beinformed/components/Routes/CheckForWebapp";
import NotFound from "beinformed/components/NotFound/NotFound";

import {
  CHANGEPASSWORD_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  USERPROFILE_PATH
} from "beinformed/constants/Constants";

import type { Location } from "react-router-dom";
import type { ApplicationModel } from "beinformed/models";

type MainRoutesProps = {
  children?: any,
  location?: Location,
  application?: ApplicationModel
};

const MainRoutes = ({ children, location, application }: MainRoutesProps) => (
  <Switch key="mainSwitch" location={location}>
    {children}
    <Route path="/" exact component={Home} />
    <Route path={LOGIN_PATH} exact component={SignIn} />
    <Route path={`(${LOGOUT_PATH}|/Logoff)`} exact component={SignOut} />

    <Route
      path={CHANGEPASSWORD_PATH}
      exact
      render={props =>
        application &&
        application.userServices &&
        application.userServices.changePassword ? (
          <Form
            {...props}
            href={application.userServices.changePassword}
            redirectTo={get(props.location, "state.from")}
          />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />

    <Route
      path={USERPROFILE_PATH}
      exact
      render={() =>
        application &&
        application.userServices &&
        application.userServices.user ? (
          <UserProfile user={application.userServices.user} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />

    <Route path="/modelcatalog" component={ModelCatalog} />

    {application && <Route path={application.tabs.routePath} component={Tab} />}

    <Route path="/:uri" exact component={CheckForWebapp} />
    <Route component={NotFound} />
  </Switch>
);

export default MainRoutes;
