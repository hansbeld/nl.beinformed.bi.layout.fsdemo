// @flow
import React, { Component } from "react";

import FormBody from "beinformed/containers/Form/FormBody";

import Button from "beinformed/components/Button/Button";
import ButtonErrorPopover from "beinformed/components/Button/ButtonErrorPopover";
import { Message } from "beinformed/i18n";

import { FormModel, ActionModel } from "beinformed/models";

import "./QuickTransfer.scss";
import { HTTP_METHODS } from "beinformed/constants/Constants";

type QuickTransferProps = {
  action: ActionModel,
  onTransferFinished: () => void,
  locale: string
};

type QuickTransferState = {
  form: FormModel | null
};

class QuickTransfer extends Component<QuickTransferProps, QuickTransferState> {
  handleSubmit = (form: FormModel) => {
    this.props.fetchModularUI(form.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: form.formdata,
      updateModel: form
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.form && nextProps.form.isFinished) {
      nextProps.onTransferFinished(nextProps.form);
    }
  }

  render() {
    if (!this.props.form || this.props.form.isFinished) {
      return null;
    }

    return (
      <div className="quicktransfer-panel">
        <h3>{this.props.form.label}</h3>
        <div className="quicktransfer">
          <FormBody form={this.props.form} autosubmit={false} />

          <div className="form-buttons">
            {this.props.form.isValid ? (
              <Button
                type="submit"
                name="submit"
                buttonStyle="primary"
                onClick={() => this.handleSubmit(this.props.form)}
              >
                <Message
                  id="quicktransfer.btn-transfer"
                  defaultMessage="Transfer"
                />
              </Button>
            ) : (
              <ButtonErrorPopover
                type="submit"
                name="submit"
                buttonStyle="primary"
                form={this.props.form}
              >
                <Message
                  id="quicktransfer.btn-transfer"
                  defaultMessage="Transfer"
                />
              </ButtonErrorPopover>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default QuickTransfer;
