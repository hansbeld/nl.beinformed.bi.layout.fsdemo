// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { Message } from "beinformed/containers/I18n/Message";

import { connect } from "react-redux";

import { applyForMortgageAction } from "fsdemo/containers/ApplyForMortgage/actions";

import Link from "beinformed/components/Link/Link";

import Href from "beinformed/models/href/Href";
import ActionModel from "beinformed/models/actions/ActionModel";

import type { Connector } from "react-redux";

type ApplyForMortgageLinkProps = {
  btnType: string,
  formUri: string,
  formLabel: any,
  onActionClick: (action: ActionModel) => void
};

/**
 * Create Action link with correct icon
 */
class ApplyForMortgageLink extends PureComponent<ApplyForMortgageLinkProps> {
  render() {
    const linkClass = classNames("btn", {
      "btn-primary": this.props.btnType === "primary",
      "btn-block btn-popout mt-2": this.props.btnType === "popout"
    });

    return (
      <Link
        onClick={() => this.props.onActionClick(this.props.form)}
        href={new Href("/applications/applications")}
        dataId="ApplyForMortgage"
        className={linkClass}
      >
        <Message
          id="ApplyForMortgageLink.link"
          defaultMessage="Apply online now"
        />
      </Link>
    );
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const connector: Connector<any, any> = connect(mapStateToProps, {
  onActionClick: applyForMortgageAction
});

export default connector(ApplyForMortgageLink);
