// @flow
import React from "react";
import { Message } from "beinformed/i18n";

import "./StatusBar.scss";

import type { UserModel } from "beinformed/models";

type StatusBarProps = { user?: UserModel };

const StatusBar = ({ user }: StatusBarProps) =>
  user ? (
    <div className="status-bar mb-1 ml-auto">
      <div className="row">
        <div className="application-location col-auto mr-auto">
          <Message
            id="Statusbar.onlineBanking"
            defaultMessage="Online banking"
          />
        </div>
        <div className="userinfo col-auto">
          <Message id="Statusbar.welcome" defaultMessage="Welcome" />,&nbsp;{user.fullname ||
            user.username}
        </div>
      </div>
    </div>
  ) : null;

export default StatusBar;
