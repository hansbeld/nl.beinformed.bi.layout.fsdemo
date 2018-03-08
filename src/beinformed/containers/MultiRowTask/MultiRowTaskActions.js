// @flow
import { connect } from "react-redux";

import { startMultiAction } from "beinformed/containers/MultiRowTask/actions";
import MultiRowTaskActions from "beinformed/components/MultiRowTask/MultiRowTaskActions";

import type { Connector } from "react-redux";
import type { MultiRowTaskProps } from "beinformed/components/MultiRowTask/MultiRowTaskActions";
import type { ActionCollection } from "beinformed/models";

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

export default connector(MultiRowTaskActions);
