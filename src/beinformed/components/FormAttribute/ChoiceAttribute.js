// @flow
import React, { Component } from "react";
import classNames from "classnames";

import ChoiceInput from "beinformed/components/FormInput/ChoiceInput";
import FormAssistant from "beinformed/components/FormAssistant/FormAssistant";
import FormLabel from "beinformed/components/FormLabel/FormLabel";
import FormContent from "beinformed/components/FormContent/FormContent";
import FormContentPopover from "beinformed/components/FormContent/FormContentPopover";

import type {
  ContentConfigurationElements,
  ChoiceAttributeModel
} from "beinformed/models";

type ChoiceAttributeProps = {
  attribute: ChoiceAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  optionContentConfiguration?: ContentConfigurationElements,
  id: string,
  name: string,
  stacked?: boolean,
  stackedItemCount?: number,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: ChoiceAttributeModel, value: string) => void,
  onClick?: (attribute: ChoiceAttributeModel, value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

class ChoiceAttribute extends Component<ChoiceAttributeProps> {
  isRadioOrCheckbox() {
    return (
      this.props.attribute.choicetype === "checkbox" ||
      this.props.attribute.choicetype === "radiobutton"
    );
  }

  renderContentBehindLabel() {
    const { attribute, questionContentConfiguration, formLayout } = this.props;

    if (
      questionContentConfiguration &&
      formLayout !== "horizontal" &&
      this.isRadioOrCheckbox()
    ) {
      return (
        <div className="col-12">
          <FormContent
            concept={attribute.concept}
            contentConfiguration={questionContentConfiguration}
          />
        </div>
      );
    }

    return null;
  }

  renderContentInLabel() {
    const { attribute, questionContentConfiguration, formLayout } = this.props;

    if (
      questionContentConfiguration &&
      formLayout !== "horizontal" &&
      this.isRadioOrCheckbox()
    ) {
      return (
        <FormContentPopover
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      );
    }

    return null;
  }

  renderContentBehindInput() {
    const { attribute, questionContentConfiguration, formLayout } = this.props;

    if (
      questionContentConfiguration &&
      (formLayout === "horizontal" || !this.isRadioOrCheckbox())
    ) {
      return (
        <FormContentPopover
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      );
    }
    return null;
  }

  renderContentBehindAssistant() {
    const { attribute, questionContentConfiguration, formLayout } = this.props;

    if (
      questionContentConfiguration &&
      (formLayout === "horizontal" || !this.isRadioOrCheckbox())
    ) {
      return (
        <FormContent
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      );
    }

    return null;
  }

  renderLabel() {
    const {
      attribute,
      questionContentConfiguration,
      id,
      name,
      formLayout
    } = this.props;

    return (
      <FormLabel
        htmlFor={id || name}
        attribute={attribute}
        contentConfiguration={questionContentConfiguration}
        formLayout={formLayout}
      >
        {this.renderContentInLabel()}
      </FormLabel>
    );
  }

  renderInput() {
    const {
      attribute,
      optionContentConfiguration,
      id,
      name,
      stacked,
      stackedItemCount,
      formLayout,
      onClick,
      onChange,
      onFocus
    } = this.props;

    return (
      <ChoiceInput
        stacked={stacked}
        stackedItemCount={stackedItemCount}
        name={name}
        id={id || name}
        label={attribute.label}
        type={attribute.choicetype}
        options={attribute.options.all}
        isTree={attribute.isTree}
        placeholder={attribute.placeholder}
        readOnly={attribute.readonly}
        optionContentConfiguration={
          optionContentConfiguration || attribute.contentConfiguration
        }
        layouthint={attribute.layouthint}
        inError={attribute.inError()}
        onChange={inputvalue => onChange(attribute, inputvalue)}
        onClick={inputvalue =>
          onClick ? onClick(attribute, inputvalue) : void 0
        }
        onFocus={onFocus}
        formLayout={formLayout}
      />
    );
  }

  renderAssistant() {
    const { attribute } = this.props;

    if (attribute.assistantMessage || attribute.constraintCollection.hasItems) {
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

  render() {
    const {
      attribute,
      className,
      questionContentConfiguration,
      name,
      stacked,
      formLayout
    } = this.props;

    const groupClass = classNames(className, "choicewidget form-group", {
      "has-danger": attribute.inError(),
      clearfix: stacked,
      HORIZONTAL_FORM_ATTRIBUTE_CLASS: formLayout === "horizontal"
    });

    return (
      <fieldset className={groupClass} data-name={name}>
        <legend className="form-legend sr-only">
          {attribute.getContentConfiguredLabel(questionContentConfiguration)}
        </legend>
        <div className="row">
          {this.renderLabel()}

          {this.renderContentBehindLabel()}

          <div className="col">
            {this.renderInput()}

            {this.renderContentBehindInput()}

            {this.renderAssistant()}

            {this.renderContentBehindAssistant()}
          </div>
        </div>
      </fieldset>
    );
  }
}

export default ChoiceAttribute;
