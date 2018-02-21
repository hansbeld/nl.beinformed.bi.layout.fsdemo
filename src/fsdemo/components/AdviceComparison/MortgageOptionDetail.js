// @flow
import React from "react";
import { Message } from "beinformed/containers/I18n/Message";
import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";
import ApplyForMortgageLink from "fsdemo/containers/ApplyForMortgage/ApplyForMortgageLink";

import AdviceExplain from "fsdemo/components/AdviceMortgageCost/AdviceExplain";

import type { MortgageData } from "fsdemo/components/AdviceMortgageCost/AdviceMortgageCost";

import "./MortgageOptionDetail.scss";

type MortgageOptionDetailProps = {
  show: boolean,
  mortgage: MortgageData
};

const MortgageOptionDetail = ({ show, mortgage }: MortgageOptionDetailProps) =>
  show ? (
    <div className="mortgage-option-detail">
      <div className="scroller">
        <h4>
          <Message
            id="MortgageOptionDetail.title"
            defaultMessage="Mortgage summary"
          />
        </h4>
        <p>
          <Message
            id="MortgageOptionDetail.description"
            defaultMessage="Below is a summary of the selected mortgage. For more information read the"
          />
          <NotImplementedLink>
            <Message
              messageId="MortgageIllustrationDoc"
              defaultMessage="Mortgage Illustration Document"
            />
          </NotImplementedLink>.
        </p>

        <AdviceExplain form={mortgage.mortgageForm} />

        <div className="whatsnext">
          <h4>
            <Message
              id="MortgageOptionDetail.whatsnext.title"
              defaultMessage="What's next?"
            />
          </h4>
          <p>
            <Message
              id="MortgageOptionDetail.whatsnext.description"
              defaultMessage="
                You can apply for your mortgage online if you are comfortable in
                choosing a mortgage without advice from us. Alternatively, you
                can apply through one of our advisors in a branch or by phone
                and receive personalised advice."
            />
            <NotImplementedLink>
              <Message
                messageId="MakeAnAppointment"
                defaultMessage="Make an appointment"
              />
            </NotImplementedLink>
          </p>
          <ApplyForMortgageLink
            btnType="primary"
            form={mortgage.mortgageForm}
          />
        </div>
      </div>
    </div>
  ) : null;

export default MortgageOptionDetail;
