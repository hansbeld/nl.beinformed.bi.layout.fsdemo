// @flow
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import { loadModel } from "beinformed/containers/ModularUI/actions";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import CaseViewModel from "beinformed/models/caseview/CaseViewModel";

import CaseView from "beinformed/components/CaseView/CaseView";

const mapStateToProps = (state: State, ownProps) => ({
  caseview: modelSelector(state, ownProps.match.url)
});

const modularUIConfig = {
  load: ({ match }) => loadModel(match.url, CaseViewModel),
  shouldLoad: ({ caseview }) => !caseview,
  shouldReload: (newProps, oldProps, hasReloadState) =>
    hasReloadState ||
    newProps.match.params.caseview !== oldProps.match.params.caseview ||
    newProps.match.params.caseid !== oldProps.match.params.caseid
};

// Export connector for reuse in projects
export const connector = connectModularUI(modularUIConfig, mapStateToProps);

// Export connected component for default use
export default connector(CaseView);
