// @flow
import React, { Component } from "react";

import { storeAttributeInput } from "fsdemo/utils/AttributeInputCache";

import FormBody from "fsdemo/containers/Advice/FormBody";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import FormTitle from "beinformed/components/Form/FormTitle";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  ADVICE_HOW_MUCH_CAN_I_BORROW_KEY,
  ADVICE_SUITABLE_MORTGAGE_KEY,
  ADVICE_WHAT_WILL_IT_COST_KEY
} from "../../constants/Constants";

import ResultHowMuchCanIBorrow from "../AdviceBorrow/ResultHowMuchCanIBorrow";
import ResultWhichMortgageTypeIsSuitableForMe from "../AdviceSuitableMortgage/ResultWhichMortgageTypeIsSuitableForMe";
import AdviceMortgageCost from "../AdviceMortgageCost/AdviceMortgageCost";
import MortgageAdviceButtons from "./MortgageAdviceButtons";

import type { LocationShape } from "react-router-dom";

import type { FormModel } from "beinformed/models";

type FormProps = {
  form?: FormModel,
  formLayout?: "vertical" | "horizontal",
  isModal?: boolean,
  fetchModularUI: Function,
  redirectTo?: LocationShape,
  onPrevious: (form: FormModel) => void
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

  renderResult() {
    const { form } = this.props;

    if (form.allEndResultObjects.hasItems) {
      storeAttributeInput(form);

      if (form.layouthint.has(ADVICE_HOW_MUCH_CAN_I_BORROW_KEY)) {
        return <ResultHowMuchCanIBorrow form={form} />;
      }

      if (form.layouthint.has(ADVICE_SUITABLE_MORTGAGE_KEY)) {
        return <ResultWhichMortgageTypeIsSuitableForMe form={form} />;
      }

      return <div className="col-4">No result information found</div>;
    }

    return <div className="col-4 mortgage-advice-result-placeholder" />;
  }

  render() {
    const { form, onCancel } = this.props;

    if (form) {
      if (form.layouthint.has(ADVICE_WHAT_WILL_IT_COST_KEY)) {
        return <AdviceMortgageCost {...this.props} />;
      }

      return (
        <div className="fullpage-form mortgage-advice">
          <FormTitle title={form.label} />

          <div className="row no-gutters mortgage-advice-row">
            <div className="col">
              <HTMLForm
                name={form.key}
                onSubmit={() => this.handleSubmit(form)}
              >
                <FormBody form={form} formLayout="horizontal" />

                <MortgageAdviceButtons
                  form={form}
                  formLayout="horizontal"
                  onCancel={onCancel}
                />
              </HTMLForm>
            </div>

            {this.renderResult()}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Form;
