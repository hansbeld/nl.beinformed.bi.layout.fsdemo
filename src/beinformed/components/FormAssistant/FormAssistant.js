// @flow
import React, { Component } from "react";
import classNames from "classnames";
import AlertCircleIcon from "mdi-react/AlertCircleIcon";
import CheckboxMarkedCircleIcon from "mdi-react/CheckboxMarkedCircleIcon";

import { Message } from "beinformed/i18n";

import type {
  ErrorCollection,
  ErrorModel,
  ConstraintCollection,
  ConstraintModel
} from "beinformed/models";

type FormAssistantProps = {
  assistantMessage?: string | null,
  constraints?: ConstraintCollection,
  errors?: ErrorCollection,
  value?: string
};

/**
 * Render assistant messages
 */
class FormAssistant extends Component<FormAssistantProps> {
  renderIcon(isError: boolean) {
    if (isError) {
      return <AlertCircleIcon className="textAfter" />;
    } else if (this.props.value && this.props.value !== "" && !isError) {
      return <CheckboxMarkedCircleIcon className="textAfter" />;
    }

    return null;
  }

  /**
   * Single constraint message
   */
  constraintMessage(constraint: ConstraintModel, idx: number) {
    const isError =
      !this.props.value || this.props.value === ""
        ? false
        : !constraint.validate(this.props.value);

    const isAssistant = !constraint.hasValidation();

    const cssClass = classNames({
      "constraint-message": constraint.hasValidation(),
      "assistant-message": isAssistant,
      "text-danger": isError,
      "text-success": this.props.value && this.props.value !== "" && !isError
    });

    return (
      <li key={idx} className={cssClass}>
        {this.renderIcon(isError)}
        <Message
          id={constraint.id}
          defaultMessage={constraint.id}
          data={constraint.parameters}
        />
      </li>
    );
  }

  errorMessage(error: ErrorModel, idx: number) {
    return (
      <li key={`error-${idx}`} className="text-danger">
        <AlertCircleIcon className="textAfter" />
        <Message
          id={error.id}
          defaultMessage={error.id}
          data={error.parameters}
        />
      </li>
    );
  }

  render() {
    const constraints = this.props.constraints
      ? this.props.constraints.filter(constraint => {
          const isError =
            !this.props.value || this.props.value === ""
              ? false
              : !constraint.validate(this.props.value);

          const isAssistant = !constraint.hasValidation();

          return isAssistant || isError;
        })
      : [];

    if (
      this.props.assistantMessage ||
      (this.props.errors && this.props.errors.serverErrors.length > 0) ||
      constraints.length > 0
    ) {
      return (
        <ul className="text-muted mb-0 small list-unstyled input-assistant">
          {this.props.assistantMessage && (
            <li className="assistant-message">{this.props.assistantMessage}</li>
          )}
          {this.props.errors &&
            this.props.errors.serverErrors.map((error, i) =>
              this.errorMessage(error, i)
            )}
          {constraints.map((constraint, i) =>
            this.constraintMessage(constraint, i)
          )}
        </ul>
      );
    }

    return null;
  }
}

export default FormAssistant;
