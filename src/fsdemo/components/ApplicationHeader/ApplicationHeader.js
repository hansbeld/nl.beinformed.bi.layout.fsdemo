import React from "react";
import { Link } from "react-router-dom";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";

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
          <NotImplementedLink>
            <Message
              messageId="ApplicationHeader.Private"
              defaultMessage="Private"
            />
          </NotImplementedLink>
          <NotImplementedLink>
            <Message
              messageId="ApplicationHeader.Business"
              defaultMessage="Business"
            />
          </NotImplementedLink>
          <NotImplementedLink>
            <Message
              messageId="ApplicationHeader.International"
              defaultMessage="International"
            />
          </NotImplementedLink>
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
          <ChevronDownIcon />
        </Link>
        <NotImplementedLink>
          <Message
            messageId="ApplicationHeader.CreditCards"
            defaultMessage="Credit cards"
          />
          <ChevronDownIcon />
        </NotImplementedLink>
        <NotImplementedLink>
          <Message messageId="ApplicationHeader.Loans" defaultMessage="Loans" />
          <ChevronDownIcon />
        </NotImplementedLink>
        <NotImplementedLink>
          <Message
            messageId="ApplicationHeader.Mortgages"
            defaultMessage="Mortgages"
          />
          <ChevronDownIcon />
        </NotImplementedLink>
        <NotImplementedLink>
          <Message
            messageId="ApplicationHeader.Insurance"
            defaultMessage="Insurance"
          />
          <ChevronDownIcon />
        </NotImplementedLink>
        <NotImplementedLink>
          <Message
            messageId="ApplicationHeader.Investments"
            defaultMessage="Investments"
          />
          <ChevronDownIcon />
        </NotImplementedLink>
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
