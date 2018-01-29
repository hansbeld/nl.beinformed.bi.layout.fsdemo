// @flow
import React from "react";

import Popover from "beinformed/components/Popover/Popover";
import FormAssistant from "beinformed/components/FormAssistant/FormAssistant";

import type ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import type ErrorCollection from "beinformed/models/error/ErrorCollection";

type CellAssistantProps = {
  assistantMessage: string | null,
  constraints: ConstraintCollection,
  errors: ErrorCollection,
  value: string
};

/**
 * Render widget assistant message
 */
const CellAssistant = ({
  assistantMessage,
  constraints,
  errors,
  value
}: CellAssistantProps) => {
  const constraintsInError = constraints
    ? constraints.filter(constraint => {
        const isError =
          !value || value === "" ? false : !constraint.validate(value);

        const isAssistant = !constraint.hasValidation();

        return isAssistant || isError;
      })
    : [];

  return assistantMessage ||
    (errors && errors.serverErrors.length > 0) ||
    constraintsInError.length > 0 ? (
    <Popover
      className="cell-assistant"
      horizontalAlignment="center"
      verticalAlignment="bottom"
    >
      <FormAssistant
        assistantMessage={assistantMessage}
        constraints={constraints}
        errors={errors}
        value={value}
      />
    </Popover>
  ) : null;
};

export default CellAssistant;
