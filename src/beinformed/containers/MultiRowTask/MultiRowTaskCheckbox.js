// @flow
import React from "react";
import classNames from "classnames";

import "./MultiRowTaskCheckbox.scss";
import type { Connector } from "react-redux";
import { connect } from "react-redux";
import { selectListItem } from "beinformed/containers/MultiRowTask/MultiRowTaskActions";

type MultiRowTaskCheckboxContainerProps = {
  className?: string,
  value: number | string,
  children?: any
};

export type MultiRowTaskCheckboxProps = {
  className?: string,
  isChecked: boolean,
  value: number | string,
  children?: any,
  onChange: (value: number | string) => void
};

/**
 * Checkbox used for a multi row task list item
 */
const MultiRowTaskCheckbox = ({
  className,
  value,
  isChecked,
  children,
  onChange
}: MultiRowTaskCheckboxProps) => (
  <div
    className={classNames(
      "multi-row-task-checkbox custom-control custom-checkbox",
      className
    )}
  >
    <input
      type="checkbox"
      className="custom-control-input"
      id={`multiselect-${value}`}
      onChange={() => onChange(value)}
      checked={isChecked}
      value={value}
    />
    <label
      className="custom-control-label"
      htmlFor={`multiselect-${value}`}
      id={`multiselect-${value}-label`}
    >
      {children}
    </label>
  </div>
);

/**
 * Map state to props
 */
const mapStateToProps = (
  state: State,
  ownProps: MultiRowTaskCheckboxContainerProps
) => ({
  ...ownProps,
  isChecked: state.multirowtask.includes(ownProps.value)
});

const connector: Connector<
  MultiRowTaskCheckboxContainerProps,
  MultiRowTaskCheckboxProps
> = connect(mapStateToProps, {
  onChange: selectListItem
});

export default connector(MultiRowTaskCheckbox);
