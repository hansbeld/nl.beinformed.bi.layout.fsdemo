// @flow
import React, { Component } from "react";
import Helmet from "react-helmet";
import { getResults } from "beinformed/components/InstrumentResult/EndResult";

import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import FormTitle from "beinformed/components/Form/FormTitle";
import FormResult from "fsdemo/components/Advice/FormResult";

import FormBody from "fsdemo/containers/Advice/FormBody";

import Modal from "beinformed/components/Modal/Modal";
import ModalBody from "beinformed/components/Modal/ModalBody";
import ModalFooter from "beinformed/components/Modal/ModalFooter";
import ModalHeader from "beinformed/components/Modal/ModalHeader";

import CheckEligibilityButtons from "./CheckEligibilityButtons";

import "./CheckEligibility.scss";

import type FormModel from "beinformed/models/form/FormModel";

type CheckEligibilityProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeFocus?: Function,
  onCancel: (form: FormModel) => void,
  onPreviousClick: (form: FormModel) => void,
  onSubmit: Function
};

class CheckEligibility extends Component<CheckEligibilityProps, {}> {
  constructor(props: CheckEligibilityProps) {
    super(props);

    this.state = {
      showComparison: false
    };
  }

  renderResult(formResult: Object) {
    const { form } = this.props;

    if (form.allEndResultObjects.hasItems) {
      const attributes = formResult.attributeCollection.all;
      const contentConfig = formResult.contentConfiguration;

      const falseResults = getResults(attributes, contentConfig).filter(
        result =>
          result.attributes.length > 0 && result.attributes[0].value === "false"
      );

      const trueResults = getResults(attributes, contentConfig).filter(
        result =>
          result.attributes.length > 0 && result.attributes[0].value === "true"
      );

      if (falseResults.length > 0) {
        return (
          <div className="col-4 mortgage-advice-result">
            {falseResults.map((result, i) => (
              <FormResult
                key={`${result.key}-${i}`}
                className="suitable-mortgage-explain"
                id={result.key}
                attributes={result.attributes}
                contentConfiguration={result.config}
              />
            ))}
          </div>
        );
      }

      // everything ok.
      if (trueResults.length > 0 && falseResults.length === 0) {
        return (
          <div className="col-4 mortgage-advice-result">
            {trueResults.map((result, i) => (
              <FormResult
                key={`${result.key}-${i}`}
                className="suitable-mortgage-explain"
                id={result.key}
                attributes={result.attributes}
                contentConfiguration={result.config}
              />
            ))}
          </div>
        );
      }
    }
    return <div className="col-4" />;
  }

  render() {
    const {
      form,
      formLayout,
      onCancel,
      onPreviousClick,
      onSubmit
    } = this.props;
    if (!form) {
      return null;
    }

    const product = form.parameters.find(
      parameter => parameter.name === "MortgageProductPackage"
    );

    if (!product) {
      throw new Error("Mortgage product package attribute not found");
    }

    const formResult =
      product.value === "Interest_onlyMortgageProduct"
        ? form.allEndResultObjects.get(
            "CheckEligibilityForAnInterest_onlyMortgage"
          )
        : form.allEndResultObjects.get("CheckEligibilityForARepaymentMortgage");

    let _modal = null;

    return (
      <Modal
        ref={c => {
          _modal = c;
        }}
        size="large"
      >
        <Helmet>
          <title>{form.missingObjects.first.label}</title>
        </Helmet>

        <ModalHeader showClose onClose={() => onCancel(form)}>
          <FormTitle title={form.missingObjects.first.label} isModal />
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
          <ModalBody>
            <div className="CheckEligibility">
              <div className="row mortgage-advice-row">
                <div className="col">
                  <FormBody form={form} formLayout={formLayout} />
                </div>
                {this.renderResult(formResult)}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <CheckEligibilityButtons
              form={form}
              formLayout={formLayout}
              onCancel={() => onCancel(form)}
              onPreviousClick={onPreviousClick}
            />
          </ModalFooter>
        </HTMLForm>
      </Modal>
    );
  }
}
export default CheckEligibility;
