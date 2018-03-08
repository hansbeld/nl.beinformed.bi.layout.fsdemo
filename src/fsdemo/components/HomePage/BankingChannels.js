// @flow
import React from "react";
import { Message } from "beinformed/i18n";

import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";

import "./BankingChannels.scss";

import bankChannelsOnline from "./bank-channels-online.png";
import bankChannelsMobile from "./bank-channels-mobile.png";
import bankChannelsBranch from "./bank-channels-branch.jpg";

/**
 * Banking Channels
 */
const BankingChannels = () => (
  <div className="banking-channels">
    <h3>
      <Message
        id="BankChannels.WaysToBank.title"
        defaultMessage="Ways to bank"
      />
    </h3>
    <div className="row">
      <div className="col-12 col-md mb-1">
        <div className="banking-channel">
          <img src={bankChannelsOnline} alt="Bank online" />
          <div className="content">
            <h4>
              <Message id="BankChannels.Online.title" defaultMessage="Online" />
            </h4>
            <p>
              <Message
                id="BankChannels.Online.description"
                defaultMessage="Quick, secure and convenient access to your accounts with our
              online banking services."
              />
            </p>
            <NotImplementedLink className="btn btn-primary">
              <Message
                messageId="BankingChannels.RegisterNow"
                defaultMessage="Register now"
              />
            </NotImplementedLink>
            <NotImplementedLink className="btn link-login">
              <Message
                messageId="BankingChannels.LogIn"
                defaultMessage="Log in"
              />
            </NotImplementedLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md mb-1">
        <div className=" banking-channel">
          <img src={bankChannelsMobile} alt="Bank with mobile application" />
          <div className="content">
            <h4>
              <Message
                id="BankChannels.App.title"
                defaultMessage="Mobile app"
              />
            </h4>
            <p>
              <Message
                id="BankChannels.App.description"
                defaultMessage="Manage your money and products from your phone or tables, anytime,
              anywhere."
              />
            </p>
            <NotImplementedLink className="btn btn-primary">
              <Message
                messageId="BankingChannels.DownloadApp"
                defaultMessage="Download app"
              />
            </NotImplementedLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-1">
        <div className=" banking-channel">
          <img src={bankChannelsBranch} alt="Visit a branch" />
          <div className="content">
            <h4>
              <Message
                id="BankChannels.visit.title"
                defaultMessage="Visit a branch"
              />
            </h4>
            <div className="row">
              <div className="col-6">
                <p>
                  <Message
                    id="BankChannels.visit.description"
                    defaultMessage="Pop into one of our branches for advice, questions and
                  registering for products."
                  />
                </p>
                <NotImplementedLink className="btn btn-primary">
                  <Message
                    messageId="BankingChannels.FindBranch"
                    defaultMessage="Find a branch"
                  />
                </NotImplementedLink>
              </div>
              <div className="col-6">
                <p>
                  <Message
                    id="BankChannels.contact"
                    defaultMessage="Contact us on:"
                  />
                  <br />
                  banking@beinformed.com<br />
                  +31 (0) 55 368 1420
                </p>
                <NotImplementedLink className="btn link-more-contact-info">
                  <Message
                    messageId="BankingChannels.MoreContactInfo"
                    defaultMessage="More contact info"
                  />
                </NotImplementedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BankingChannels;
