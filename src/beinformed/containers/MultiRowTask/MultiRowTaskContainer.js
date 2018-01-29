// @flow
import { connect } from "react-redux";

import { startMultiAction } from "beinformed/containers/MultiRowTask/MultiRowTaskActions";
import MultiRowTask from "beinformed/containers/MultiRowTask/MultiRowTask";

import type { Connector } from "react-redux";
import type { MultiRowTaskProps } from "beinformed/containers/MultiRowTask/MultiRowTask";
import type ActionCollection from "beinformed/models/actions/ActionCollection";

type MultiRowTaskContainerProps = {
  actions: ActionCollection
};

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: MultiRowTaskContainerProps
) => ({
  selectedItemIds: state.multirowtask,
  actions: ownProps.actions
});

const connector: Connector<
  MultiRowTaskContainerProps,
  MultiRowTaskProps
> = connect(mapStateToProps, {
  onClick: startMultiAction
});

export default connector(MultiRowTask);
