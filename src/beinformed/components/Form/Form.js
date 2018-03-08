// @flow
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import FormBody from "beinformed/containers/Form/FormBody";
import FullPageForm from "beinformed/components/Form/FullPageForm";
import ModalForm from "beinformed/components/Form/ModalForm";

import ReloadList from "beinformed/containers/List/ReloadList";

import { HTTP_METHODS } from "beinformed/constants/Constants";
import {
  FORM_FINISH_RETURN_RELOAD_LIST,
  FORM_FINISH_RETURN
} from "beinformed/constants/LayoutHints";

import type { LocationShape } from "react-router-dom";

import type { FormModel } from "beinformed/models";
type FormProps = {
  form?: FormModel,
  formLayout?: "vertical" | "horizontal",
  isModal?: boolean,
  fetchModularUI: Function,
  redirectTo?: LocationShape,
  onPrevious: (form: FormModel) => void,
  onCancel: (form: FormModel) => void
};

class Form extends Component<FormProps> {
  static defaultProps = {
    isModal: false
  };

  handleSubmit = (form: FormModel) => {
    this.props.fetchModularUI(form.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: form.formdata,
      updateModel: form
    });
  };

  redirect(redirectTo: LocationShape) {
    const redirect = Object.assign(redirectTo, {
      state: { reload: true }
    });

    return <Redirect to={redirect} />;
  }

  handleFinished(form: FormModel) {
    const { redirectTo } = this.props;

    if (form.layouthint.has(FORM_FINISH_RETURN_RELOAD_LIST)) {
      return <ReloadList href={form.selfhref} />;
    } else if (form.layouthint.has(FORM_FINISH_RETURN)) {
      return null;
    } else if (form.isFinished && redirectTo) {
      return this.redirect(redirectTo);
    } else if (form.redirectLocation) {
      if (form.redirectLocation.isExternal) {
        window.location = form.redirectLocation.href;
        return null;
      }
      return this.redirect(form.redirectLocation.toLocation());
    }

    return null;
  }

  render() {
    const { form, formLayout, isModal, onCancel, onPrevious } = this.props;

    if (form) {
      if (form.isFinished) {
        return this.handleFinished(form);
      }

      const FormComponent = isModal ? ModalForm : FullPageForm;
      const layout = formLayout || (isModal ? "vertical" : "horizontal");

      return (
        <FormComponent
          form={form}
          formLayout={layout}
          onCancel={onCancel}
          onSubmit={this.handleSubmit}
          onPrevious={onPrevious}
        >
          <FormBody form={form} formLayout={layout} />
        </FormComponent>
      );
    }

    return null;
  }
}

export default Form;
