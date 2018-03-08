// @flow
import { connect } from "react-redux";

import ProgressIndicator from "beinformed/components/ProgressIndicator/ProgressIndicator";

import type { Connector } from "react-redux";
export type ProgressIndicatorProps = {
  count: number,
  timestamp: number
};

const mapStateToProps = (state: State) => ({
  count: state.progressindicator.count,
  timestamp: state.progressindicator.timestamp,
  percentComplete: state.progressindicator.percentComplete
});

export const connector: Connector<{}, ProgressIndicatorProps> = connect(
  mapStateToProps,
  {}
);

export default connector(ProgressIndicator);
