// @flow
import React from "react";
import classNames from "classnames";

import { withMessage } from "beinformed/containers/I18n/Message";

import Button from "beinformed/components/Button/Button";
import ButtonErrorPopover from "beinformed/components/Button/ButtonErrorPopover";

import { HORIZONTAL_FORM_LABEL_CLASS } from "beinformed/constants/Constants";

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
  onCancel,
  onPreviousClick
}: FormButtonsProps) => {
  const firstMissingObject = form.missingObjects.first;

  const previousLabel =
    firstMissingObject && firstMissingObject.buttonLabels.previous
      ? firstMissingObject.buttonLabels.previous
      : message("Form.Button.Previous", "Previous");

  const cancelLabel =
    firstMissingObject && firstMissingObject.buttonLabels.cancel
      ? firstMissingObject.buttonLabels.cancel
      : message("Form.Button.Cancel", "Cancel");

  const nextLabel =
    firstMissingObject && firstMissingObject.buttonLabels.next
      ? firstMissingObject.buttonLabels.next
      : message("Form.Button.Next", "Next");

  const finishLabel =
    firstMissingObject && firstMissingObject.buttonLabels.finish
      ? firstMissingObject.buttonLabels.finish
      : message("Form.Button.Finish", "Finish");

  const offsetClass = classNames({
    [HORIZONTAL_FORM_LABEL_CLASS.replace("col-", "offset-")]:
      formLayout === "horizontal"
  });

  return (
    <div className="form-buttons">
      <div className={offsetClass}>
        {form.hasPreviousStep && (
          <Button
            type="button"
            name="previous"
            className="mr-1"
            onClick={() => onPreviousClick(form)}
          >
            {previousLabel}
          </Button>
        )}
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
            {form.hasNextStep ? nextLabel : finishLabel}
          </Button>
        ) : (
          <ButtonErrorPopover
            type="submit"
            name="submit"
            buttonStyle="primary"
            form={form}
          >
            {form.hasNextStep ? nextLabel : finishLabel}
          </ButtonErrorPopover>
        )}
      </div>
    </div>
  );
};
export default withMessage(FormButtons);
