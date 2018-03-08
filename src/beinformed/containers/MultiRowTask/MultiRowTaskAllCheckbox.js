// @flow
import { connect } from "react-redux";

import { selectAllListItems } from "beinformed/containers/MultiRowTask/actions";

import MultiRowTaskCheckbox from "beinformed/components/MultiRowTask/MultiRowTaskCheckbox";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  id: "all",
  value:
    state.multirowtask.length === ownProps.values.length ? [] : ownProps.values,
  isChecked: state.multirowtask.length === ownProps.values.length
});

export default connect(mapStateToProps, {
  onChange: selectAllListItems
})(MultiRowTaskCheckbox);
