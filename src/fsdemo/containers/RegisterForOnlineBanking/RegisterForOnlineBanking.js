// @flow
import { get } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";

import modularui from "beinformed/modularui/modularui";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import { previousObject } from "beinformed/containers/Form/actions";

import Form from "beinformed/components/Form/Form";

const REGISTRATION_FORM_URL =
  "/mortgage-calculators/register/register-for-online-banking";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isModal: get(ownProps.location, "state.modal")
});

const mapDispatchToProps = {
  onPrevious: previousObject,
  onCancel: () => goBack()
};

export const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  modularui("Form", REGISTRATION_FORM_URL, {
    propName: "form",
    method: HTTP_METHODS.POST
  })
);

// Export connected component for default use
export default connector(Form);
