// @flow
import { get } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";

import modularui from "beinformed/utils/modularui/modularui";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import { previousObject } from "beinformed/containers/Form/actions";

import Form from "beinformed/components/Form/Form";

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
  modularui(
    "Form",
    ({ href, location }) => href || `${location.pathname}${location.search}`,
    { propName: "form", method: HTTP_METHODS.POST }
  )
);

// Export connected component for default use
export default connector(Form);
