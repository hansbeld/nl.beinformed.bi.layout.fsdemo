// @flow
import { connect } from "react-redux";

import { login } from "beinformed/containers/SignIn/actions";

import SignIn from "beinformed/components/SignIn/SignIn";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.error
});

export const connector = connect(mapStateToProps, {
  onSubmit: login
});

export default connector(SignIn);
