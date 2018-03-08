// @flow
import React from "react";

import InlineEditStringCell from "beinformed/components/InlineEdit/InlineEditStringCell";
import type { NumberAttributeModel } from "beinformed/models";

type InlineEditNumberCellProps = {
  attribute: NumberAttributeModel,
  className?: string,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Renders number widget, same as text widget with different css class
 */
const InlineEditNumberCell = (props: InlineEditNumberCellProps) => (
  <InlineEditStringCell {...props} className="numberwidget" />
);

export default InlineEditNumberCell;
