// @flow
import React from "react";
import classNames from "classnames";

import StringAttribute from "beinformed/components/FormAttribute/StringAttribute";
import type MoneyAttributeModel from "beinformed/models/attributes/NumberAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type MoneyAttributeProps = {
  attribute: MoneyAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: MoneyAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Renders money form group
 */
const MoneyAttribute = ({
  attribute,
  className,
  onChange,
  ...props
}: MoneyAttributeProps) => (
  <StringAttribute
    {...props}
    attribute={attribute}
    className={classNames(className, "moneywidget")}
    onChange={(stringAttribute, inputvalue) => onChange(attribute, inputvalue)}
  />
);

export default MoneyAttribute;
