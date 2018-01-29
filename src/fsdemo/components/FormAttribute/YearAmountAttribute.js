import React from "react";

import StringAttribute from "beinformed/components/FormAttribute/StringAttribute";

import YearAmountInput from "fsdemo/components/FormInput/YearAmountInput";

class YearAmountAttribute extends StringAttribute {
  static defaultProps = {
    className: "moneywidget yearamountwidget"
  };

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
      <YearAmountInput
        name={name}
        id={id}
        value={
          attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue
        }
        prepend={attribute.prefix}
        apend={attribute.postfix}
        readOnly={attribute.readonly}
        placeholder={attribute.placeholder}
        inError={attribute.inError()}
        autoFocus={autoFocus}
        layouthint={attribute.layouthint}
        onChange={inputvalue => onChange(attribute, inputvalue)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }
}

export default YearAmountAttribute;
