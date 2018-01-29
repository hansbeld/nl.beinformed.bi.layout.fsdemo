// @flow
import React from "react";

import FormBody from "beinformed/containers/Form/FormBody";
import FullPageForm from "beinformed/components/Form/FullPageForm";
import ModalForm from "beinformed/components/Form/ModalForm";

import type FormModel from "beinformed/models/form/FormModel";

type FormProps = {
  form?: FormModel,
  formLayout?: "vertical" | "horizontal",
  isModal?: boolean,
  onCancel: (form: FormModel) => void,
  onPrevious: (form: FormModel) => void,
  onSubmit: (form: FormModel) => void
};

const Form = ({
  form,
  formLayout,
  isModal = false,
  onCancel,
  onPrevious,
  onSubmit
}: FormProps) => {
  const FormComponent = isModal ? ModalForm : FullPageForm;
  const layout = formLayout || (isModal ? "vertical" : "horizontal");

  return form ? (
    <FormComponent
      form={form}
      formLayout={layout}
      onSubmit={onSubmit}
      onPrevious={onPrevious}
      onCancel={onCancel}
    >
      <FormBody form={form} formLayout={layout} />
    </FormComponent>
  ) : null;
};

export default Form;
