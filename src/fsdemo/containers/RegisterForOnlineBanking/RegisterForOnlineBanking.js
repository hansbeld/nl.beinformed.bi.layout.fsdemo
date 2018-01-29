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

const REGISTRATION_FORM_URL =
  "/mortgage-calculators/register/register-for-online-banking";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => {
  const model = modelSelector(state, REGISTRATION_FORM_URL);

  return {
    ...ownProps,
    form: model && model.type === "Form" ? model : null
  };
};

const mapDispatchToProps = {
  onCancel: cancelForm,
  onSubmit: submitForm,
  onPrevious: previousObject
};

const modularUIConfig = {
  load: ({ location }) => {
    if (location.state && location.state.from) {
      return fetchForm(new Href(REGISTRATION_FORM_URL), location.state.from);
    }

    return fetchForm(new Href(REGISTRATION_FORM_URL));
  },
  shouldLoad: ({ form, location }) =>
    (!location.state || !location.state.modal) && !form,
  shouldReload: () => false
};

// Export connector for reuse in projects
export const connector = connectModularUI(
  modularUIConfig,
  mapStateToProps,
  mapDispatchToProps
);

// Export connected component for default use
export default connector(Form);
