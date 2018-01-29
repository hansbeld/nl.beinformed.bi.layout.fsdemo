// @flow
import {
  cancelForm,
  submitForm,
  previousObject
} from "beinformed/containers/Form/actions";

import { loadChangePassword } from "beinformed/containers/ChangePassword/actions";

import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";

import Form from "beinformed/components/Form/Form";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  application: modelSelector(state, "/"),
  form: modelSelector(state, "/Login/changepassword"),
  redirect:
    ownProps.location && ownProps.location.state && ownProps.location.state.from
      ? ownProps.location.state.from
      : null,
  isModal:
    ownProps.location &&
    ownProps.location.state &&
    ownProps.location.state.modal
});

const mapDispatchToProps = {
  onCancel: cancelForm,
  onSubmit: submitForm,
  onPrevious: previousObject
};

const modularUIConfig = {
  load: ({ application, redirect }) =>
    loadChangePassword(application, redirect),
  shouldLoad: ({ form }) => !form
};

// Export connector for reuse in projects
export const connector = connectModularUI(
  modularUIConfig,
  mapStateToProps,
  mapDispatchToProps
);

// Export connected component for default use
export default connector(Form);
