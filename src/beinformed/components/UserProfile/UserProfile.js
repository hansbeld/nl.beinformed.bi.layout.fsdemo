import React from "react";
import { Link } from "react-router-dom";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import Panel from "beinformed/components/Panel/Panel";
import PanelBody from "beinformed/components/Panel/PanelBody";
import PanelTitle from "beinformed/components/Panel/PanelTitle";
import PanelFooter from "beinformed/components/Panel/PanelFooter";

import { Message } from "beinformed/i18n";
import {
  CHANGEPASSWORD_PATH,
  LOGOUT_PATH
} from "beinformed/constants/Constants";

import "./UserProfile.scss";

const UserProfile = ({ user, className }) => (
  <div className="user-profile">
    <Panel className={className}>
      <PanelBody>
        <PanelTitle>{user.fullname}</PanelTitle>

        <AttributeList attributes={user.attributeCollection.all} />
      </PanelBody>
      <PanelFooter className="pt-4">
        <Link
          to={{ pathname: CHANGEPASSWORD_PATH, state: { modal: true } }}
          className="btn btn-secondary mr-1"
        >
          <Message
            id="UserLinks.Menu.ChangePassword"
            defaultMessage="Change password"
          />
        </Link>
        <Link to={{ pathname: LOGOUT_PATH }} className="btn btn-secondary">
          <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
        </Link>
      </PanelFooter>
    </Panel>
  </div>
);

export default UserProfile;
