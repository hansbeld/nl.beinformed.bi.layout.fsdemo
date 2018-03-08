// @flow
import { modularui } from "beinformed/modularui";
import CaseView from "beinformed/components/CaseView/CaseView";

export const connector = modularui("CaseView", ({ match }) => match.url, {
  propName: "caseview"
});
export default connector(CaseView);
