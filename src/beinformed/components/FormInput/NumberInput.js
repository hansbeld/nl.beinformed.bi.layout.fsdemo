// @flow
import React from "react";

import TextInput from "beinformed/components/FormInput/TextInput";

type NumberInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id: string,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  value: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render number input
 */
const NumberInput = ({ value = "", ...props }: NumberInputProps) => (
  <TextInput {...props} value={value} type="text" />
);

export default NumberInput;
