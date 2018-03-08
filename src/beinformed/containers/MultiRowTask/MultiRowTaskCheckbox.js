// @flow
import { connect } from "react-redux";

import { selectListItem } from "beinformed/containers/MultiRowTask/actions";

import MultiRowTaskCheckbox from "beinformed/components/MultiRowTask/MultiRowTaskCheckbox";

import type { Connector } from "react-redux";

type MultiRowTaskCheckboxContainerProps = {
  className?: string,
  value: number | string,
  children?: any
};

export type MultiRowTaskCheckboxProps = {
  id: string,
  className?: string,
  isChecked: boolean,
  value: number | string,
  children?: any,
  onChange: (value: number | string) => void
};

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: MultiRowTaskCheckboxContainerProps
) => ({
  ...ownProps,
  id: ownProps.value.toString(),
  isChecked: state.multirowtask.includes(ownProps.value)
});

const connector: Connector<
  MultiRowTaskCheckboxContainerProps,
  MultiRowTaskCheckboxProps
> = connect(mapStateToProps, {
  onChange: selectListItem
});

export default connector(MultiRowTaskCheckbox);
