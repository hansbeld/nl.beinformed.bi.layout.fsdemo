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
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.ContactUs"
                defaultMessage="Contact us"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.HelpAndFAQs"
                defaultMessage="Help &amp; FAQs"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.FraudDetection"
                defaultMessage="Fraud detection"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.ServiceStatus"
                defaultMessage="Service status"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.LostStolenCard"
                defaultMessage="Lost or stolen card"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.FindBranch"
                defaultMessage="Find a branch"
              />
            </NotImplementedLink>
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
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.AboutUs"
                defaultMessage="About us"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.News"
                defaultMessage="News"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.BankingWithUs"
                defaultMessage="Banking with us"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Testimonials"
                defaultMessage="Testimonials"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Partners"
                defaultMessage="Partners"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Careers"
                defaultMessage="Careers"
              />
            </NotImplementedLink>
          </li>
        </ul>
      </div>
      <div className="col">
        <h3>
          <Message id="ApplicationFooter.Products" defaultMessage="Products" />
        </h3>
        <ul className="list-unstyled">
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Accounts"
                defaultMessage="Accounts"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Mortgages"
                defaultMessage="Mortgages"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.CreditCards"
                defaultMessage="CreditCards"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Insurance"
                defaultMessage="Insurance"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Loans"
                defaultMessage="Loans"
              />
            </NotImplementedLink>
          </li>
          <li>
            <NotImplementedLink>
              <Message
                messageId="ApplicationFooter.Investment"
                defaultMessage="Investment"
              />
            </NotImplementedLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ApplicationFooter;
