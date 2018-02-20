// @flow
import React, { Component } from "react";
import AccountIcon from "mdi-react/AccountIcon";
import KeyIcon from "mdi-react/KeyIcon";
import LoginIcon from "mdi-react/LoginIcon";
import LogoutIcon from "mdi-react/LogoutIcon";

import { Message } from "beinformed/containers/I18n/Message";
import Href from "beinformed/models/href/Href";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownToggle from "beinformed/components/Dropdown/DropdownToggle";
import DropdownLink from "beinformed/components/Dropdown/DropdownLink";
import Link from "beinformed/components/Link/Link";

import {
  LOGIN_PATH,
  LOGOUT_PATH,
  CHANGEPASSWORD_PATH
} from "beinformed/constants/Constants";

import type UserServicesModel from "beinformed/models/user/UserServicesModel";

type UserMenuProps = {
  userServices: UserServicesModel
};

class UserMenu extends Component<UserMenuProps> {
  renderLoggedIn(user: UserModel) {
    return (
      <div className="account-menu">
        <Dropdown className="userlinks" align="right">
          <DropdownToggle>
            <AccountIcon className="textAfter" />
            <span className="username">{user ? user.fullname : ""}</span>
          </DropdownToggle>

          <DropdownChildren>
            <DropdownLink className="user-profile" href={new Href("/user")}>
              <AccountIcon className="textAfter" />
              <Message
                id="UserLinks.Menu.UserProfile"
                defaultMessage="User profile"
              />
            </DropdownLink>

            <DropdownLink
              className="change-password"
              href={new Href(CHANGEPASSWORD_PATH)}
              isModal
            >
              <KeyIcon className="textAfter" />
              <Message
                id="UserLinks.Menu.ChangePassword"
                defaultMessage="Change password"
              />
            </DropdownLink>

            <div
              role="separator"
              className="dropdown-divider"
              aria-label="separator"
            />

            <DropdownLink className="signout" href={new Href(LOGOUT_PATH)}>
              <LogoutIcon className="textAfter" />
              <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
            </DropdownLink>
          </DropdownChildren>
        </Dropdown>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <Link
        className="signin"
        dataId="login"
        href={new Href(LOGIN_PATH)}
        isNavLink
      >
        <LoginIcon className="textAfter" />
        <Message id="UserLinks.Menu.LogIn" defaultMessage="Login" />
      </Link>
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
