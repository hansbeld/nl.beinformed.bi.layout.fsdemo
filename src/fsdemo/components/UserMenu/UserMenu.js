// @flow
import React, { Component } from "react";

import { Message } from "beinformed/containers/I18n/Message";
import Href from "beinformed/models/href/Href";

import Icon from "beinformed/components/Icon/Icon";
import Link from "beinformed/components/Link/Link";

import { LOGIN_PATH, LOGOUT_PATH } from "beinformed/constants/Constants";

import type UserServicesModel from "beinformed/models/user/UserServicesModel";

import "./UserMenu.scss";

type UserMenuProps = {
  userServices: UserServicesModel
};

class UserMenu extends Component<UserMenuProps> {
  renderLoggedIn() {
    return (
      <div className="customer">
        <Link
          className="signout btn btn-primary"
          dataId="logout"
          href={new Href(LOGOUT_PATH)}
        >
          <Icon name="sign-out" textAfter />
          <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
        </Link>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div className="customer">
        <Link
          className="signin btn btn-primary"
          dataId="login"
          href={new Href(LOGIN_PATH)}
        >
          <Icon name="sign-in" textAfter />
          <Message id="UserLinks.Menu.LogIn" defaultMessage="Login" />
        </Link>
        <Link
          className="register btn btn-link"
          dataId="register"
          href={new Href("/register-for-online-banking")}
        >
          <Message id="AccountMenu.Register" defaultMessage="Register" />
        </Link>
      </div>
    );
  }

  render() {
    const UNSECURE_LINK_COUNT = 3;
    return this.props.userServices &&
      this.props.userServices.links.length > UNSECURE_LINK_COUNT
      ? this.renderLoggedIn(this.props.userServices.user)
      : this.renderLoggedOut();
  }
}

export default UserMenu;
