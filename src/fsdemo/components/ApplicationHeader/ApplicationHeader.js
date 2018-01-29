import React from "react";
import { Link } from "react-router-dom";

import { Message } from "beinformed/containers/I18n/Message";
import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";

import LanguageSelectorContainer from "beinformed/containers/LanguageSelector/LanguageSelector";

import UserMenu from "fsdemo/components/UserMenu/UserMenu";
import StatusBar from "fsdemo/components/StatusBar/StatusBar";

import Logo from "fsdemo/components/Logo/Logo";

import "./ApplicationHeader.scss";

const ApplicationHeader = ({ application }) => (
  <div className="app-header">
    <div className="top-header">
      <div className="row">
        <div className="top-header-menu col-auto mr-auto">
          <Link to="/" className="active">
            <Message
              id="ApplicationHeader.Personal"
              defaultMessage="Personal"
            />
          </Link>
          <NotImplementedLink
            messageId="ApplicationHeader.Private"
            defaultMessage="Private"
          />
          <NotImplementedLink
            messageId="ApplicationHeader.Business"
            defaultMessage="Business"
          />
          <NotImplementedLink
            messageId="ApplicationHeader.International"
            defaultMessage="International"
          />
        </div>
        <div className="top-header-right col-auto">
          <LanguageSelectorContainer />
        </div>
      </div>
    </div>
    <div className="main-header d-flex">
      <div className="logo">
        <Logo />
      </div>
      <div className="personal-menu">
        <Link to="/accounts/customer">
          <Message id="ApplicationHeader.Accounts" defaultMessage="Accounts" />
        </Link>
        <NotImplementedLink
          messageId="ApplicationHeader.CreditCards"
          defaultMessage="Credit cards"
        />
        <NotImplementedLink
          messageId="ApplicationHeader.Loans"
          defaultMessage="Loans"
        />
        <NotImplementedLink
          messageId="ApplicationHeader.Mortgages"
          defaultMessage="Mortgages"
        />
        <NotImplementedLink
          messageId="ApplicationHeader.Insurance"
          defaultMessage="Insurance"
        />
        <NotImplementedLink
          messageId="ApplicationHeader.Investments"
          defaultMessage="Investments"
        />
      </div>

      <UserMenu userServices={application.userServices} />
    </div>
    {application.userServicess &&
      application.userServices.user && (
        <StatusBar user={application.userServices.user} />
      )}
  </div>
);

export default ApplicationHeader;
