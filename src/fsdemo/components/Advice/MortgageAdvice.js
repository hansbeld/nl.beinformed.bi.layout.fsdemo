// @flow
import React, { Component } from "react";
import Helmet from "react-helmet";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import FormTitle from "beinformed/components/Form/FormTitle";
import FormBody from "fsdemo/containers/Advice/FormBody";

import "./MortgageAdvice.scss";

import ResultHowMuchCanIBorrow from "../AdviceBorrow/ResultHowMuchCanIBorrow";
import ResultWhichMortgageTypeIsSuitableForMe from "../AdviceSuitableMortgage/ResultWhichMortgageTypeIsSuitableForMe";
import AdviceMortgageCost from "../AdviceMortgageCost/AdviceMortgageCost";
import MortgageAdviceButtons from "./MortgageAdviceButtons";

import {
  ADVICE_SUITABLE_MORTGAGE_KEY,
  ADVICE_HOW_MUCH_CAN_I_BORROW_KEY,
  ADVICE_WHAT_WILL_IT_COST_KEY
} from "fsdemo/constants/Constants";

import type FormModel from "beinformed/models/form/FormModel";

type MortgageAdviceProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeFocus?: Function,
  onCancel: (form: FormModel) => void,
  onPreviousClick: (form: FormModel) => void,
  onSubmit: Function
};

class MortgageAdvice extends Component<MortgageAdviceProps> {
  renderResult() {
    const { form } = this.props;

    if (form.allEndResultObjects.hasItems) {
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
    if (!this.props.form) {
      return null;
    }

    if (this.props.form.layouthint.has(ADVICE_WHAT_WILL_IT_COST_KEY)) {
      return <AdviceMortgageCost {...this.props} />;
    }

    const {
      form,
      formLayout,
      onCancel,
      onPreviousClick,
      onSubmit
    } = this.props;

    return (
      <div className="fullpage-form mortgage-advice">
        <FormTitle title={form.label} />

        <div className="row no-gutters mortgage-advice-row">
          <div className="col">
            <HTMLForm name={form.key} onSubmit={() => onSubmit(form)}>
              <Helmet>
                <title>{form.label}</title>
              </Helmet>

              <FormBody form={form} formLayout={formLayout} />

              <MortgageAdviceButtons
                form={form}
                formLayout={formLayout}
                onCancel={() => onCancel(form)}
                onPreviousClick={onPreviousClick}
              />
            </HTMLForm>
          </div>

          {this.renderResult()}
        </div>
      </div>
    );
  }
}

export default MortgageAdvice;
