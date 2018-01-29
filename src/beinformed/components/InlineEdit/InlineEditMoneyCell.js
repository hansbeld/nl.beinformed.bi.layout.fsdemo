// @flow
import React from "react";

import InlineEditStringCell from "beinformed/components/InlineEdit/InlineEditStringCell";
import type MoneyAttributeModel from "beinformed/models/attributes/MoneyAttributeModel";

type InlineEditMoneyCellProps = {
  attribute: MoneyAttributeModel,
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
const InlineEditMoneyCell = (props: InlineEditMoneyCellProps) => (
  <InlineEditStringCell {...props} className="moneywidget" />
);

export default InlineEditMoneyCell;
