// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";
import { ActionModel } from "beinformed/models";

import "./MortgageInstrumentLink.scss";

import type { Connector } from "react-redux";

type MortgageInstrumentLinkProps = {
  className?: string,
  isGuestUser: boolean,
  instrumentURI: string,
  instrumentLabel: any,
  dataId: string,
  btnType: string,
  showEllipsis?: boolean,
  hideOtherForms?: boolean,
  isModal: boolean
};

/**
 * Create Action link with correct icon
 */
class MortgageInstrumentLink extends PureComponent<
  MortgageInstrumentLinkProps
> {
  static defaultProps = {
    hideOtherForms: true
  };

  createAction() {
    const instrumentURI = this.props.instrumentURI;

    if (
      instrumentURI.includes("classify-suitable-mortgage") &&
      !this.props.isGuestUser
    ) {
      return ActionModel.createFromHref(
        instrumentURI,
        `/${instrumentURI}?ApplicantIsAnExistingCustomer=Yes`
      );
    }
    return ActionModel.createFromHref(instrumentURI, `/${instrumentURI}`);
  }

  getLinkClass() {
    const linkClass = classNames("btn", this.props.className, {
      "btn-primary": this.props.btnType === "primary",
      "btn-block btn-popout mt-2": this.props.btnType === "popout"
    });

    return linkClass;
  }

  render() {
    const action = this.createAction();

    return (
      <Link
        href={action.selfhref}
        className={this.getLinkClass()}
        isModal={this.props.isModal}
        dataId={this.props.dataId}
      >
        {this.props.instrumentLabel}
      </Link>
    );
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isGuestUser: typeof state.user === "undefined"
});

const connector: Connector<any, any> = connect(mapStateToProps, {});

export default connector(MortgageInstrumentLink);
