// @flow
import React from "react";
import { connect } from "react-redux";

import { selectAllListItems } from "beinformed/containers/MultiRowTask/MultiRowTaskActions";

import { Message } from "beinformed/containers/I18n/Message";

import "./MultiRowTaskCheckbox.scss";

type MultiRowTaskAllCheckboxProps = {
  isChecked: boolean,
  values: number[],
  onChange: (values: number[]) => void
};

/**
 * Checkbox used for a multi row task list item
 */
const MultiRowTaskAllCheckbox = ({
  values,
  isChecked,
  onChange
}: MultiRowTaskAllCheckboxProps) => (
  <div className="multi-row-task-checkbox custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      id="multiselect-all"
      onChange={() => onChange(isChecked ? [] : values)}
      checked={isChecked}
    />
    <label
      className="custom-control-label"
      htmlFor="multiselect-all"
      id="multiselect-all-label"
    >
      <span className="sr-only">
        <Message
          id="MultiRowTask.AllCheckbox"
          defaultMessage="Check all items"
        />
      </span>
    </label>
  </div>
);

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  value: ownProps.values,
  isChecked: state.multirowtask.length === ownProps.values.length
});

export default connect(mapStateToProps, {
  onChange: selectAllListItems
})(MultiRowTaskAllCheckbox);
