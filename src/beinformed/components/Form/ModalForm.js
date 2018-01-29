// @flow
import React from "react";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";
import FormTitle from "beinformed/components/Form/FormTitle";
import FormButtons from "beinformed/components/Form/FormButtons";

import Modal from "beinformed/components/Modal/Modal";
import ModalBody from "beinformed/components/Modal/ModalBody";
import ModalFooter from "beinformed/components/Modal/ModalFooter";
import ModalHeader from "beinformed/components/Modal/ModalHeader";

import type FormModel from "beinformed/models/form/FormModel";
import type { RouterHistory } from "react-router-dom";

type ModalFormProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  history: RouterHistory,
  children: any,
  onCancel: (form: FormModel) => void,
  onPrevious: (form: FormModel) => void,
  onSubmit: (form: FormModel) => void
};

/**
 * Render a form in a modal
 */
const ModalForm = ({
  form,
  formLayout,
  history,
  children,
  onCancel,
  onPrevious,
  onSubmit
}: ModalFormProps) => {
  let _modal = null;

  return (
    <Modal
      ref={c => {
        _modal = c;
      }}
      size="large"
    >
      <Helmet>
        <title>{form.label}</title>
      </Helmet>

      <ModalHeader
        showClose
        onClose={() => {
          onCancel(form);
          history.goBack();
        }}
      >
        <FormTitle title={form.label} isModal />
      </ModalHeader>
      <HTMLForm
        name={form.key}
        onSubmit={() => {
          if (_modal) {
            _modal.scrollTop();
          }
          return onSubmit(form);
        }}
      >
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <FormButtons
            form={form}
            formLayout={formLayout}
            onCancel={() => {
              onCancel(form);
              history.goBack();
            }}
            onPreviousClick={() => onPrevious(form)}
          />
        </ModalFooter>
      </HTMLForm>
    </Modal>
  );
};

export default withRouter(ModalForm);
