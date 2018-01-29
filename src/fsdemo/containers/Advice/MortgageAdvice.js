// @flow
import Href from "beinformed/models/href/Href";
import { cancelForm, previousObject } from "beinformed/containers/Form/actions";

import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";

import {
  startInstrument,
  getEndResult
} from "fsdemo/containers/Advice/actions";
import MortgageAdvice from "fsdemo/components/Advice/MortgageAdvice";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => {
  const model = modelSelector(state, ownProps.match.url);

  return {
    ...ownProps,
    formLayout: "horizontal",
    form: model && model.type === "Form" ? model : null
  };
};

const mapDispatchToProps = {
  onCancel: cancelForm,
  onSubmit: getEndResult,
  onPrevious: previousObject
};

const modularUIConfig = {
  load: ({ match, location }) =>
    startInstrument(new Href(`${match.url}${location.search}`)),
  shouldLoad: ({ form }) => !form,
  shouldReload: () => false
};

// Export connector for reuse in projects
export const connector = connectModularUI(
  modularUIConfig,
  mapStateToProps,
  mapDispatchToProps
);

// Export connected component for default use
export default connector(MortgageAdvice);
