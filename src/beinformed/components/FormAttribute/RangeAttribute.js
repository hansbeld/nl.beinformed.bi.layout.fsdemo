// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { NumberAttributeModel } from "beinformed/models";

import NumberAttribute from "beinformed/components/FormAttribute/NumberAttribute";
import DatetimeAttribute from "beinformed/components/FormAttribute/DatetimeAttribute";
import FormAssistant from "beinformed/components/FormAssistant/FormAssistant";
import FormLabel from "beinformed/components/FormLabel/FormLabel";
import FormContent from "beinformed/components/FormContent/FormContent";
import FormContentPopover from "beinformed/components/FormContent/FormContentPopover";

import type {
  ContentConfigurationElements,
  CompositeAttributeModel
} from "beinformed/models";

type RangeAttributeProps = {
  attribute: CompositeAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  namePrefix?: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: RangeChildAttributeType, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render range form group
 */
class RangeAttribute extends Component<RangeAttributeProps> {
  renderChildAttribute(
    type: "begin" | "end",
    childAttribute: RangeChildAttributeType
  ) {
    const childClass = classNames(`range-${type}`, {
      "has-danger": childAttribute.inError()
    });

    const name = (this.props.namePrefix || "") + childAttribute.name;

    if (childAttribute instanceof NumberAttributeModel) {
      return (
        <NumberAttribute
          className={childClass}
          questionContentConfiguration={this.props.questionContentConfiguration}
          attribute={childAttribute}
          isFilter={this.props.isFilter}
          name={name}
          id={name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
      );
    }

    return (
      <DatetimeAttribute
        className={childClass}
        questionContentConfiguration={this.props.questionContentConfiguration}
        attribute={childAttribute}
        isFilter={this.props.isFilter}
        name={name}
        id={name}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
      />
    );
  }

  render() {
    const {
      attribute,
      className,
      namePrefix = "",
      name,
      id,
      questionContentConfiguration,
      formLayout
    } = this.props;

    if (attribute.children.length === 0) {
      return <div>rangefilter</div>;
    }

    const groupClass = classNames("form-group row", className, {
      "has-danger": attribute.inError(),
      rangewidget: !className || !className.includes("widget")
    });

    const groupId =
      id === namePrefix + attribute.start.name ? `${id}-widget` : id;

    return (
      <div className={groupClass} data-name={name} id={groupId}>
        <FormLabel
          attribute={attribute}
          contentConfiguration={questionContentConfiguration}
          formLayout={formLayout}
        />
        <div className="col">
          <div className="range">
            {this.renderChildAttribute("begin", attribute.start)}
            {this.renderChildAttribute("end", attribute.end)}
          </div>
          <FormContentPopover
            concept={attribute.concept}
            contentConfiguration={questionContentConfiguration}
          />
          {(attribute.assistantMessage ||
            attribute.constraintCollection.hasItems ||
            attribute.errorCollection.hasItems) && (
            <FormAssistant
              constraints={attribute.constraintCollection}
              errors={attribute.errorCollection}
              assistantMessage={attribute.assistantMessage}
            />
          )}
          <FormContent
            concept={attribute.concept}
            contentConfiguration={questionContentConfiguration}
          />
        </div>
      </div>
    );
  }
}

export default RangeAttribute;
