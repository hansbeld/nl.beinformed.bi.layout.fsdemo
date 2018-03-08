// @flow
import React from "react";

import { Message } from "beinformed/i18n";
import ChoiceInputGroup from "beinformed/components/FormInput/ChoiceInputGroup";
import InputGroup from "beinformed/components/FormInputGroup/InputGroup";
import SelectInput from "beinformed/components/FormInput/SelectInput";
import TreeInput from "beinformed/components/FormInput/TreeInput";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel
} from "beinformed/models";

type ChoiceInputProps = {
  className?: string,
  disabled?: boolean,
  id: string,
  isTree: boolean,
  label: string,
  name: string,
  optionContentConfiguration?: ContentConfigurationElements | null,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  stacked?: boolean,
  type:
    | "checkbox"
    | "radiobutton"
    | "list"
    | "listview"
    | "combobox"
    | "longlist"
    | "table",
  inError?: boolean,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onClick?: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render the a choice input, based on a layout hint
 */
const ChoiceInput = ({
  options,
  isTree,
  type = "checkbox",
  ...props
}: ChoiceInputProps) => {
  if (
    options.length > 0 &&
    isTree &&
    (type === "checkbox" || type === "radiobutton")
  ) {
    return <TreeInput options={options} type={type} {...props} />;
  } else if (
    options.length > 0 &&
    (type === "checkbox" || type === "radiobutton")
  ) {
    return <ChoiceInputGroup options={options} type={type} {...props} />;
  } else if (
    options.length > 0 &&
    (type === "table" ||
      type === "list" ||
      type === "listview" ||
      type === "combobox" ||
      type === "longlist")
  ) {
    return <SelectInput options={options} placeholder="" {...props} />;
  }

  return (
    <InputGroup>
      <p className="text-muted">
        <em>
          {options.length ? (
            <Message
              id="ChoiceField.Msg.NoOptionsAvailable"
              defaultMessage="No options available"
            />
          ) : (
            <Message
              id="ChoiceField.Msg.NotSupported"
              defaultMessage="Input not suported"
            />
          )}
        </em>
      </p>
    </InputGroup>
  );
};

export default ChoiceInput;
