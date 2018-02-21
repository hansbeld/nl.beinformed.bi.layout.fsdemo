// @flow
import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";

import modularui from "beinformed/utils/modularui/modularui";
import { removeModel } from "beinformed/containers/ModularUI/actions";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import FormBody from "beinformed/components/Form/FormBody";
import { updateFormAttribute } from "beinformed/containers/Form/actions";

class ApplyForMortgageForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.form && nextProps.form.isFinished) {
      this.props.removeModel(nextProps.form);
    }
  }

  render() {
    return <FormBody {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isModal: false,
  autosubmit: true
});

export const connector = compose(
  connect(mapStateToProps, {
    onAttributeChange: updateFormAttribute,
    removeModel
  }),
  modularui(
    "Form",
    ({ href, location }) => href || `${location.pathname}${location.search}`,
    { propName: "form", method: HTTP_METHODS.POST }
  )
);

// Export connected component for default use
export default connector(ApplyForMortgageForm);
