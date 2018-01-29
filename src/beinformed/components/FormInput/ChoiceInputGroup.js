// @flow
import React, { Component } from "react";
import classNames from "classnames";

import FormContentPopover from "beinformed/components/FormContent/FormContentPopover";
import FormContent from "beinformed/components/FormContent/FormContent";

import { withMessage } from "beinformed/containers/I18n/Message";
import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";
import CheckboxInput from "beinformed/components/FormInput/CheckboxInput";
import RadioInput from "beinformed/components/FormInput/RadioInput";

import "./ChoiceInputGroup.scss";

import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type ChoiceInputGroupProps = {
  className?: string,
  disabled?: boolean,
  id: string,
  label: string,
  message: messageFunctionType,
  name: string,
  optionContentConfiguration: ContentConfigurationElements,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  stacked?: boolean,
  stackedItemCount?: number,
  type: "checkbox" | "radiobutton",
  inError?: boolean,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onClick?: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a group of toggle items, radio or checkbox without children
 */
class ChoiceInputGroup extends Component<ChoiceInputGroupProps> {
  getBooleanOptionLabel(option) {
    return this.props.message(
      option.code === "true" ? "Choice.Boolean.True" : "Choice.Boolean.False",
      option.label
    );
  }

  render() {
    const {
      className,
      optionContentConfiguration,
      disabled,
      id,
      label,
      name,
      options,
      readOnly,
      stacked,
      stackedItemCount,
      type,
      inError,
      onBlur,
      onClick,
      onChange,
      onFocus
    } = this.props;

    const choiceClass = classNames({
      "custom-controls-stacked":
        stacked && (type === "checkbox" || type === "radiobutton"),
      "custom-controls-row":
        !stacked && (type === "checkbox" || type === "radiobutton")
    });

    const ChoiceInputType = type === "radiobutton" ? RadioInput : CheckboxInput;

    const stackedGroups = [];

    if (stackedItemCount) {
      for (let i = 0; i < options.length; i += stackedItemCount) {
        stackedGroups.push(options.slice(i, i + stackedItemCount));
      }
    } else {
      stackedGroups.push(options);
    }

    const groupClass = classNames("form-choice-group", className);

    return (
      <div className={groupClass} role="group" aria-label={label}>
        {stackedGroups.map((stackGroup, s) => (
          <div key={`stack-${s}`} className={choiceClass}>
            {stackGroup.map((option, i) => (
              <span
                key={i}
                className={classNames("option", { active: option.selected })}
              >
                <ChoiceInputType
                  name={name}
                  id={id}
                  label={
                    option.isBooleanType
                      ? this.getBooleanOptionLabel(option)
                      : getChoiceOptionLabel(option, optionContentConfiguration)
                  }
                  value={option.code}
                  isChecked={option.selected}
                  disabled={disabled || readOnly}
                  stacked={stacked}
                  inError={inError}
                  onChange={onChange}
                  onBlur={onBlur}
                  onClick={onClick}
                  onFocus={onFocus}
                  count={option.count}
                >
                  <FormContentPopover
                    concept={option.concept}
                    contentConfiguration={optionContentConfiguration}
                  />
                </ChoiceInputType>

                <FormContent
                  concept={option.concept}
                  contentConfiguration={optionContentConfiguration}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default withMessage(ChoiceInputGroup);
