// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Message } from "beinformed/i18n";

import { applyForMortgageAction } from "fsdemo/containers/ApplyForMortgage/actions";

import { ActionModel } from "beinformed/models";

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

    const href = {
      pathname: "/apply-for-a-mortgage",
      state: {
        data: this.props.form.formdata
      }
    };

    return (
      <Link to={href} data-id="ApplyForMortgage" className={linkClass}>
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
