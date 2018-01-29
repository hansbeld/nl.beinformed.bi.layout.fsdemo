import React from "react";

import { Message } from "beinformed/containers/I18n/Message";
import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";

import "./ApplicationFooter.scss";

const ApplicationFooter = () => (
  <div className="application-footer">
    <div className="row">
      <div className="col">
        <h3>
          <Message
            id="ApplicationFooter.SupportAndServices"
            defaultMessage="Support &amp; services"
          />
        </h3>
        <ul className="list-unstyled">
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.ContactUs"
              defaultMessage="Contact us"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.HelpAndFAQs"
              defaultMessage="Help &amp; FAQs"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.FraudDetection"
              defaultMessage="Fraud detection"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.ServiceStatus"
              defaultMessage="Service status"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.LostStolenCard"
              defaultMessage="Lost or stolen card"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.FindBranch"
              defaultMessage="Find a branch"
            />
          </li>
        </ul>
      </div>
      <div className="col">
        <h3>
          <Message
            id="ApplicationFooter.About"
            defaultMessage="About be informed banking"
          />
        </h3>
        <ul className="list-unstyled">
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.AboutUs"
              defaultMessage="About us"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.News"
              defaultMessage="News"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.BankingWithUs"
              defaultMessage="Banking with us"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Testimonials"
              defaultMessage="Testimonials"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Partners"
              defaultMessage="Partners"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Careers"
              defaultMessage="Careers"
            />
          </li>
        </ul>
      </div>
      <div className="col">
        <h3>
          <Message id="ApplicationFooter.Products" defaultMessage="Products" />
        </h3>
        <ul className="list-unstyled">
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Accounts"
              defaultMessage="Accounts"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Mortgages"
              defaultMessage="Mortgages"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.CreditCards"
              defaultMessage="CreditCards"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Insurance"
              defaultMessage="Insurance"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Loans"
              defaultMessage="Loans"
            />
          </li>
          <li>
            <NotImplementedLink
              messageId="ApplicationFooter.Investment"
              defaultMessage="Investment"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ApplicationFooter;
