// @flow
import Href from "beinformed/models/href/Href";
import {
  fetchForm,
  cancelForm,
  submitForm,
  previousObject
} from "beinformed/containers/Form/actions";

import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";

import Form from "beinformed/components/Form/Form";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => {
  const model = modelSelector(state, ownProps.location.pathname);

  return {
    ...ownProps,
    isModal: true,
    form: model && model.type === "Form" ? model : null
  };
};

const mapDispatchToProps = {
  onCancel: cancelForm,
  onSubmit: submitForm,
  onPrevious: previousObject
};

const modularUIConfig = {
  key: ({ location }) => location.pathname,
  load: ({ location }) =>
    fetchForm(new Href(`${location.pathname}${location.search}`)),
  shouldLoad: props => !props.form,
  shouldReload: newProps => !newProps.form
};

// Export connector for reuse in projects
export const connector = connectModularUI(
  modularUIConfig,
  mapStateToProps,
  mapDispatchToProps
);

// Export connected component for default use
export default connector(Form);
