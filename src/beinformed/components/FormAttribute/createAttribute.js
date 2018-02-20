// @flow
import React, { Component } from "react";
import classNames from "classnames";
import FilterIcon from "mdi-react/FilterIcon";

import Button from "beinformed/components/Button/Button";

import FormAssistant from "beinformed/components/FormAssistant/FormAssistant";
import FormLabel from "beinformed/components/FormLabel/FormLabel";
import FormContent from "beinformed/components/FormContent/FormContent";
import FormContentPopover from "beinformed/components/FormContent/FormContentPopover";

import { Message } from "beinformed/containers/I18n/Message";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type AttributeProps = {
  attribute: StringAttributeModel | NumberAttributeModel | MoneyAttributeModel,
  className?: string,
  questionContentConfiguration?: ?ContentConfigurationElements,
  id?: string,
  isFilter?: boolean,
  name: string,
  autoFocus?: boolean,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: StringAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

const createAttribute = (WrappedInput: any) => {
  class Attribute extends Component<AttributeProps> {
    renderLabel() {
      return (
        <FormLabel
          htmlFor={this.props.id || this.props.name}
          attribute={this.props.attribute}
          contentConfiguration={this.props.questionContentConfiguration}
          formLayout={this.props.formLayout}
        />
      );
    }

    renderInput() {
      const { attribute, onChange } = this.props;

      return (
        <WrappedInput
          {...this.props}
          value={
            attribute.readonly ? attribute.readonlyvalue : attribute.inputvalue
          }
          prepend={attribute.prefix}
          append={attribute.postfix}
          readOnly={attribute.readonly}
          placeholder={attribute.placeholder}
          inError={attribute.inError()}
          layouthint={attribute.layouthint}
          onChange={inputvalue => onChange(attribute, inputvalue)}
        />
      );
    }

    renderFilterButton() {
      return (
        <Button name="filter" className="filter-button ml-1" type="submit">
          <FilterIcon />
          <Message
            id="FilterButton.Label"
            defaultMessage="Filter"
            screenreaderOnly
          />
        </Button>
      );
    }

    renderAssistant() {
      const attribute = this.props.attribute;

      if (
        attribute.assistantMessage ||
        attribute.constraintCollection.hasItems
      ) {
        return (
          <FormAssistant
            assistantMessage={attribute.assistantMessage}
            constraints={attribute.constraintCollection}
            errors={attribute.errorCollection}
            value={attribute.inputvalue}
          />
        );
      }

      return null;
    }

    renderContent() {
      return (
        <FormContent
          concept={this.props.attribute.concept}
          contentConfiguration={this.props.questionContentConfiguration}
        />
      );
    }

    renderPopoverContent() {
      return (
        <FormContentPopover
          concept={this.props.attribute.concept}
          contentConfiguration={this.props.questionContentConfiguration}
        />
      );
    }

    render() {
      const groupClass = classNames(
        "form-group row",
        `${this.props.attribute.type}widget`,
        this.props.className,
        {
          "has-danger": this.props.attribute.inError()
        }
      );

      return (
        <div className={groupClass} data-name={this.props.name}>
          {this.renderLabel()}
          <div className="col">
            {this.props.isFilter ? (
              <div className="d-flex flex-row">
                {this.renderInput()}
                {this.renderFilterButton()}
              </div>
            ) : (
              this.renderInput()
            )}
            {this.renderPopoverContent()}
            {this.renderAssistant()}
            {this.renderContent()}
          </div>
        </div>
      );
    }
  }

  return Attribute;
};

export default createAttribute;
