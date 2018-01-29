import React from "react";

import StringAttribute from "beinformed/components/FormAttribute/StringAttribute";

import UpDownNumberInput from "fsdemo/components/FormInput/UpDownNumberInput";

class UpDownNumberAttribute extends StringAttribute {
  renderInput() {
    const {
      name,
      id,
      attribute,
      autoFocus,
      onChange,
      onBlur,
      onFocus
    } = this.props;
    return (
      <UpDownNumberInput
        name={name}
        id={id}
        value={
          attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue
        }
        prepend={attribute.prefix}
        append={attribute.postfix}
        readOnly={attribute.readonly}
        placeholder={attribute.placeholder}
        inError={attribute.inError()}
        autoFocus={autoFocus}
        minValue={attribute.minValue}
        maxValue={attribute.maxValue}
        onChange={inputvalue => onChange(attribute, inputvalue)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }
}

export default UpDownNumberAttribute;
