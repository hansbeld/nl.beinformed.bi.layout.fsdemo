// @flow
import React from "react";

import CaptchaAttribute from "beinformed/components/FormAttribute/CaptchaAttribute";
import ChoiceAttribute from "beinformed/components/FormAttribute/ChoiceAttribute";
import CompositeAttribute from "beinformed/components/FormAttribute/CompositeAttribute";
import DatetimeAttribute from "beinformed/components/FormAttribute/DatetimeAttribute";
import LabelAttribute from "beinformed/components/FormAttribute/LabelAttribute";
import HelptextAttribute from "beinformed/components/FormAttribute/HelptextAttribute";
import LookupAttribute from "beinformed/components/FormAttribute/LookupAttribute";
import MemoAttribute from "beinformed/components/FormAttribute/MemoAttribute";
import MoneyAttribute from "beinformed/components/FormAttribute/MoneyAttribute";
import NumberAttribute from "beinformed/components/FormAttribute/NumberAttribute";
import PasswordAttribute from "beinformed/components/FormAttribute/PasswordAttribute";
import RangeAttribute from "beinformed/components/FormAttribute/RangeAttribute";
import StringAttribute from "beinformed/components/FormAttribute/StringAttribute";
import UploadAttribute from "beinformed/components/FormAttribute/UploadAttribute";
import XMLAttribute from "beinformed/components/FormAttribute/XMLAttribute";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type FormAttributeProps = {
  attribute: AttributeType,
  className?: string,
  questionContentConfiguration?: ?ContentConfigurationElements,
  optionContentConfiguration?: ?ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  AttributeRenderer?: any,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange?: (attribute: AttributeType, value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onSubmit?: Function
};

/**
 * Render correct Form Group
 */
const FormAttribute = ({ attribute, name, ...props }: FormAttributeProps) => {
  const attributeMap = {
    lookup: LookupAttribute,
    choice: ChoiceAttribute,
    date: DatetimeAttribute,
    time: DatetimeAttribute,
    timestamp: DatetimeAttribute,
    composite: CompositeAttribute,
    range: RangeAttribute,
    helptext: HelptextAttribute,
    label: LabelAttribute,
    memo: MemoAttribute,
    money: MoneyAttribute,
    number: NumberAttribute,
    password: PasswordAttribute,
    upload: UploadAttribute,
    xml: XMLAttribute,
    captcha: CaptchaAttribute,
    string: StringAttribute
  };

  const attributeType =
    attribute.type in attributeMap ? attribute.type : "string";
  const Attribute = attributeMap[attributeType];

  if (attributeType === "composite") {
    props.AttributeRenderer = this;
  }

  return (
    <Attribute attribute={attribute} name={name || attribute.name} {...props} />
  );
};

export default FormAttribute;
