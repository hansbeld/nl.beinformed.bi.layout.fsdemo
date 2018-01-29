// @flow
import React from "react";
import Helmet from "react-helmet";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import FormTitle from "beinformed/components/Form/FormTitle";
import FormButtons from "beinformed/components/Form/FormButtons";

import "./FullPageForm.scss";

import type FormModel from "beinformed/models/form/FormModel";

type FullPageFormProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  children: any,
  onCancel: (form: FormModel) => void,
  onPrevious: (form: FormModel) => void,
  onSubmit: (form: FormModel) => void
};

const FullPageForm = ({
  form,
  formLayout,
  children,
  onCancel,
  onPrevious,
  onSubmit
}: FullPageFormProps) => (
  <div className="fullpage-form container">
    <FormTitle title={form.label} />

    <HTMLForm name={form.key} onSubmit={() => onSubmit(form)}>
      <Helmet>
        <title>{form.label}</title>
      </Helmet>

      {children}

      <FormButtons
        form={form}
        formLayout={formLayout}
        onCancel={onCancel}
        onPreviousClick={onPrevious}
      />
    </HTMLForm>
  </div>
);

export default FullPageForm;
