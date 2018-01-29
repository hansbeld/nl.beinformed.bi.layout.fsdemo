// @flow
import React from "react";

import getHint from "beinformed/constants/LayoutHints";

import DefaultAttributeRenderer from "beinformed/components/FormAttribute/AttributeRenderer";

import UpDownNumberAttribute from "./UpDownNumberAttribute";
import YearAmountAttribute from "./YearAmountAttribute";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type FormAttributeProps = {
  attribute: AttributeType,
  className?: string,
  questionContentConfiguration?: ?ContentConfigurationElements,
  optionContentConfiguration?: ?ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange?: (attribute: AttributeType, value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onSubmit?: Function
};

const PLUS_MINUS_WIDGET = getHint("PLUS_MINUS_WIDGET");
const YEAR_AMOUNT = getHint("YEAR_AMOUNT");

/**
 * Render correct Form Group
 */
const AttributeRenderer = (props: FormAttributeProps) => {
  if (props.attribute.layouthint.has(PLUS_MINUS_WIDGET)) {
    return <UpDownNumberAttribute {...props} />;
  } else if (props.attribute.layouthint.has(YEAR_AMOUNT)) {
    return <YearAmountAttribute {...props} />;
  }

  return <DefaultAttributeRenderer {...props} />;
};

export default AttributeRenderer;
