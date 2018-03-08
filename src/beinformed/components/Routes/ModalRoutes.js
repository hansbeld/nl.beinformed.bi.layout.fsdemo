// @flow
import React from "react";
import { get } from "lodash";
import { Switch, Route, Redirect } from "react-router-dom";

import Form from "beinformed/containers/Form/Form";

import SignIn from "beinformed/containers/SignIn/SignIn";

import {
  CHANGEPASSWORD_PATH,
  LOGIN_PATH
} from "beinformed/constants/Constants";

import type { ApplicationModel } from "beinformed/models";

type ModalRoutesProps = {
  children?: any,
  application?: ApplicationModel,
  isModal?: boolean
};

const ModalRoutes = ({ children, application, isModal }: ModalRoutesProps) =>
  isModal ? (
    <Switch key="modalSwitch">
      {children}
      <Route path={LOGIN_PATH} exact component={SignIn} />

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

      <Route component={Form} />
    </Switch>
  ) : null;

export default ModalRoutes;
