// @flow
import React, { Component } from "react";
import Helmet from "react-helmet";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import FormTitle from "beinformed/components/Form/FormTitle";
import FormBody from "fsdemo/containers/Advice/FormBody";

import "../Advice/MortgageAdvice.scss";

import type FormModel from "beinformed/models/form/FormModel";

import ResultWhatWillMyMortgageCost from "../AdviceMortgageCost/ResultWhatWillMyMortgageCost";
import MortgageAdviceButtons from "../Advice/MortgageAdviceButtons";

import MortgageComparison from "fsdemo/components/AdviceComparison/MortgageComparison";

import withModularUI from "beinformed/utils/modularui/withModularUI";
import { HTTP_METHODS } from "beinformed/constants/Constants";
import { storeAttributeInput } from "../../utils/AttributeInputCache";

export type MortgageData = {
  isComplete: boolean,
  isPinned: boolean,
  key: string,
  mortgageForm: FormModel
};

type MortgageAdviceProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  locale: string,
  modularui: any,
  onCancel: (form: FormModel) => void,
  onPreviousClick: (form: FormModel) => void,
  onSubmit: Function
};
type MortgageAdviceState = {
  comparison: Array<MortgageData>
};

class MortgageAdvice extends Component<
  MortgageAdviceProps,
  MortgageAdviceState
> {
  constructor(props: MortgageAdviceProps) {
    super(props);

    this.state = {
      comparison: []
    };
  }

  addComparison() {
    // when nothing is pinned, compare all possible options
    if (
      this.state.comparison.filter(mortgage => mortgage.isPinned).length === 0
    ) {
      this.createInitialComparison();
    } else {
      this.addCurrentFormToComparison();
    }
  }

  createComparisonForm(rateType, period) {
    const comparisonForm = this.props.form.clone(true);

    const rateTypeAttribute = comparisonForm.findAttribute(
      attribute => attribute.key === "InterestRateType"
    );
    const periodAttribute = comparisonForm.findAttribute(
      attribute => attribute.key === "PeriodOfInterestRate"
    );

    rateTypeAttribute.reset();
    rateTypeAttribute.update(rateType);

    periodAttribute.reset();
    periodAttribute.update(period);

    return comparisonForm;
  }

  addCurrentFormToComparison() {
    if (
      typeof this.state.comparison.find(
        mortgage => mortgage.key === this.props.form.formdata
      ) === "undefined"
    ) {
      this.setState({
        comparison: [
          ...this.state.comparison.filter(mortgage => mortgage.isPinned),
          {
            key: this.props.form.formdata,
            isComplete: true,
            mortgageForm: this.props.form.clone(true),
            isPinned: true
          }
        ]
      });
    }
  }

  createInitialComparison() {
    const interestRateType = this.props.form.findAttribute(
      attribute => attribute.key === "InterestRateType"
    );
    const periodOfInterestRate = this.props.form.findAttribute(
      attribute => attribute.key === "PeriodOfInterestRate"
    );

    const requestForms = [];

    interestRateType.options.all.forEach(rateType => {
      periodOfInterestRate.options.all.forEach(period => {
        requestForms.push(
          this.createComparisonForm(rateType.code, period.code)
        );
      });
    });

    const requests = requestForms.map(requestForm =>
      this.props
        .modularui(this.props.form.selfhref, {
          method: "post",
          data: requestForm.formdata
        })
        .fetch()
        .then(mortgageForm => {
          const compareForm = requestForm.update(mortgageForm);
          return {
            key: requestForm.formdata,
            isComplete: mortgageForm.isComplete,
            mortgageForm: compareForm,
            isPinned: false
          };
        })
    );

    Promise.all(requests).then(mortgages => {
      this.setState({
        comparison: mortgages
      });
    });
  }

  renderResult() {
    const { form } = this.props;

    if (form.allEndResultObjects.hasItems) {
      storeAttributeInput(form);

      return (
        <ResultWhatWillMyMortgageCost
          form={form}
          doComparison={() => {
            this.addComparison();
          }}
          isComparing={
            this.state.comparison.filter(mortgage => mortgage.isPinned).length >
            0
          }
        />
      );
    }

    return <div className="col-4 mortgage-advice-result-placeholder" />;
  }

  handleSubmit = (form: FormModel) => {
    this.props.fetchModularUI(form.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: form.formdata,
      updateModel: form
    });
  };

  render() {
    const { form, formLayout, onCancel } = this.props;

    return (
      <div className="fullpage-form mortgage-advice">
        <FormTitle title={form.label} />

        <div className="row no-gutters mortgage-advice-row">
          <div className="col">
            <HTMLForm name={form.key} onSubmit={() => this.handleSubmit(form)}>
              <Helmet>
                <title>{form.label}</title>
              </Helmet>

              <FormBody form={form} formLayout={formLayout} />

              <MortgageAdviceButtons
                form={form}
                formLayout="horizontal"
                onCancel={() => onCancel(form)}
              />
            </HTMLForm>
          </div>

          {this.renderResult()}
        </div>

        {this.state.comparison.length > 0 && (
          <MortgageComparison
            comparison={this.state.comparison}
            onPinClick={mortgage => {
              this.setState({
                comparison: this.state.comparison.map(
                  item =>
                    item.key === mortgage.key
                      ? {
                          ...item,
                          isPinned: !item.isPinned
                        }
                      : item
                )
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default withModularUI(MortgageAdvice);
