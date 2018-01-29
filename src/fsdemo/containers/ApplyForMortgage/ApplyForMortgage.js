// @flow
import ApplyForMortgage from "fsdemo/components/ApplyForMortgage/ApplyForMortgage";

import { connector } from "beinformed/containers/CaseView/CaseView";

export default connector(ApplyForMortgage);

//
// import connectModularUI from "beinformed/utils/modularui/connectModularUI";
// import { modelSelectorStartsWith } from "beinformed/containers/ModularUI/selectors";
//
// import { startApplication } from "fsdemo/containers/ApplyForMortgage/actions";
//
// const mapStateToProps = (state: State) => ({
//   caseview: modelSelectorStartsWith(
//     state,
//     "/apply-for-a-mortgage/mortgage-application"
//   )
// });
//
// const modularUIConfig = {
//   load: ({ caseview }) => startApplication(caseview),
//   shouldLoad: ({ caseview }) => !caseview,
//   shouldReload: (newProps, oldProps, hasReloadState) => hasReloadState
// };
//
// // Export connector for reuse in projects
// export const connector = connectModularUI(modularUIConfig, mapStateToProps);
//
// // Export connected component for default use
// export default connector(ApplyForMortgage);
