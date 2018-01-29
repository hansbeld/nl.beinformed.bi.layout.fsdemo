// @flow
import React from "react";
import classNames from "classnames";

import { withMessage } from "beinformed/containers/I18n/Message";
import Button from "beinformed/components/Button/Button";
import ButtonErrorPopover from "beinformed/components/Button/ButtonErrorPopover";
import type FormModel from "beinformed/models/form/FormModel";

type FormButtonsProps = {
  form: FormModel,
  message: messageFunctionType,
  formLayout: "vertical" | "horizontal",
  onCancel: Function,
  onPreviousClick: Function
};

const FormButtons = ({
  form,
  formLayout,
  message,
  onCancel
}: FormButtonsProps) => {
  const firstMissingObject = form.missingObjects.first;

  const cancelLabel =
    firstMissingObject && firstMissingObject.buttonLabels.cancel
      ? firstMissingObject.buttonLabels.cancel
      : message("Form.Button.Close", "Close");

  const recalculateLabel = message("Form.Button.CheckAgain", "Check again");
  const calculateLabel = message("Form.Button.Check", "Check");

  const buttonsClass = classNames("form-buttons", {
    "text-center": formLayout === "horizontal"
  });

  return (
    <div className={buttonsClass}>
      <Button
        type="button"
        name="close"
        onClick={() => onCancel(form)}
        buttonStyle="link"
        className="mr-1"
      >
        {cancelLabel}
      </Button>
      {form.isValid ? (
        <Button type="submit" name="submit" buttonStyle="primary">
          {form.allEndResultObjects.length > 0
            ? recalculateLabel
            : calculateLabel}
        </Button>
      ) : (
        <ButtonErrorPopover
          type="submit"
          name="submit"
          buttonStyle="primary"
          form={form}
        >
          {form.allEndResultObjects.length > 0
            ? recalculateLabel
            : calculateLabel}
        </ButtonErrorPopover>
      )}
    </div>
  );
};
export default withMessage(FormButtons);
