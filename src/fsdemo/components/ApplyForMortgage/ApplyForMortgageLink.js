// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { Message } from "beinformed/containers/I18n/Message";

import Link from "beinformed/components/Link/Link";

import Href from "beinformed/models/href/Href";

type ApplyForMortgageLinkProps = {
  btnType: string
};

/**
 * Create Action link with correct icon
 */
class ApplyForMortgageLink extends Component<ApplyForMortgageLinkProps> {
  render() {
    const linkClass = classNames("btn", {
      "btn-primary": this.props.btnType === "primary",
      "btn-block btn-popout mt-2": this.props.btnType === "popout"
    });

    return (
      <Link
        href={new Href("/apply-for-a-mortgage")}
        dataId="ApplyForMortgage"
        className={linkClass}
        onclick={}
      >
        <Message
          id="ApplyForMortgageLink.link"
          defaultMessage="Apply online now"
        />
      </Link>
    );
  }
}

export default ApplyForMortgageLink;
