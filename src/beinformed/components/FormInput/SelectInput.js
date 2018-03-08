// @flow
import React, { Component } from "react";
import classNames from "classnames";

import InputGroup from "beinformed/components/FormInputGroup/InputGroup";
import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownToggle from "beinformed/components/Dropdown/DropdownToggle";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownItem from "beinformed/components/Dropdown/DropdownItem";
import LookupInputActiveOption from "beinformed/components/FormInput/LookupInputActiveOption";
import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";
import { withMessage } from "beinformed/i18n";
import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";

import "./SelectInput.scss";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel
} from "beinformed/models";

type SelectInputProps = {
  children?: any,
  className?: string,
  disabled?: boolean,
  id?: string,
  name: string,
  optionContentConfiguration?: ContentConfigurationElements,
  options: ChoiceAttributeOptionModel[],
  placeholder?: string,
  readOnly?: boolean,
  message: messageFunctionType,
  inError?: boolean,
  onChange: (value: string) => void
};

/**
 * Render a html select
 */
class SelectInput extends Component<SelectInputProps> {
  /**
   * Flaten option array to a single level array (in case there are children present)
   */
  flattenOptions(options: ChoiceAttributeOptionModel[], level: number = 0) {
    const opts = [];

    options.forEach(option => {
      const newOption = option.clone();

      newOption.level = level;

      opts.push(newOption);
      if (newOption.children) {
        const flatten = this.flattenOptions(newOption.children.all, level + 1);

        opts.push(...flatten);
      }
    });

    return opts;
  }

  renderActiveOptions(value: string, options: ChoiceAttributeOptionModel[]) {
    const placeholder =
      this.props.placeholder === ""
        ? this.props.message("SelectField.Placeholder", "Choose an option")
        : this.props.placeholder;

    if (value.length === 0) {
      return placeholder;
    }

    return options
      .filter(option => option.selected)
      .map(option => (
        <LookupInputActiveOption
          key={option.code}
          option={option}
          onClick={() => this.props.onChange(option.code)}
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
          optionContentConfiguration={this.props.optionContentConfiguration}
        />
      ));
  }

  renderOptions(options: ChoiceAttributeOptionModel[]) {
    return options.map(option => {
      const isSelected =
        !option.selected || option.selected === null ? false : option.selected;
      return (
        <DropdownItem
          key={option.code}
          value={option.code}
          selected={isSelected}
          style={{ paddingLeft: `${option.level + 1}em` }}
          onClick={() => this.props.onChange(option.code)}
        >
          <span className="header">
            {getChoiceOptionLabel(
              option,
              this.props.optionContentConfiguration
            )}
          </span>
          {option.concept &&
            this.props.optionContentConfiguration && (
              <FormContentRenderer
                concept={option.concept}
                contentConfiguration={this.props.optionContentConfiguration}
              />
            )}
        </DropdownItem>
      );
    });
  }

  /**
   * Render
   */
  render() {
    const options = this.flattenOptions(this.props.options);
    const value = options
      .filter(option => option.selected)
      .map(option => option.code)
      .join(",");

    const id = this.props.id || this.props.name;

    const selectClass = classNames("select-field", this.props.className, {
      disabled: this.props.disabled,
      readonly: this.props.readOnly,
      "is-invalid": this.props.inError
    });

    return (
      <InputGroup>
        <Dropdown className={selectClass} activeValue={value}>
          <DropdownToggle className="btn-light" id={id}>
            {this.renderActiveOptions(value, options)}
          </DropdownToggle>
          <DropdownChildren>{this.renderOptions(options)}</DropdownChildren>
        </Dropdown>
        {this.props.children}
      </InputGroup>
    );
  }
}

export default withMessage(SelectInput);
