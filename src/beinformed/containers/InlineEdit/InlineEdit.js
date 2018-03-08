// @flow
import { connect } from "react-redux";

import {
  finishProgress,
  startProgress
} from "beinformed/containers/ProgressIndicator/actions";

import {
  cancelEditableListItem,
  saveEditableListItem,
  updateEditableListAttribute
} from "beinformed/containers/InlineEdit/actions";

import InlineEditTable from "beinformed/components/InlineEdit/InlineEdit";

import type { ListModel } from "beinformed/models";

type InlineEditTableOwnProps = {
  className?: string,
  list: ListModel
};

/**
 * Map state to props
 */
const mapStateToProps = (state: {}, ownProps: InlineEditTableOwnProps) => ({
  ...ownProps
});

export const connector = connect(mapStateToProps, {
  onAttributeChange: updateEditableListAttribute,
  onCancel: cancelEditableListItem,
  onSave: saveEditableListItem,
  onStartProgress: startProgress,
  onFinishProgress: finishProgress
});

export default connector(InlineEditTable);
