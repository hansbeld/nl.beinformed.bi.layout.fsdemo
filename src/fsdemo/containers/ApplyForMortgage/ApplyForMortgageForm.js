// @flow
import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";

import modularui from "beinformed/modularui/modularui";
import {
  removeModel,
  updateModel,
  loadModularUI
} from "beinformed/containers/ModularUI/actions";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import FormBody from "beinformed/components/Form/FormBody";
import FormModel from "beinformed/models/form/FormModel";

import type FormObjectModel from "beinformed/models/form/FormObjectModel";

class ApplyForMortgageForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.form && nextProps.form.isFinished) {
      if (nextProps.panel) {
        nextProps.removeModel(nextProps.panel);
      }

      nextProps.removeModel(nextProps.form);
    }
  }

  render() {
    return <FormBody {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isModal: false,
  autosubmit: true
});

const updateRiskForm = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string,
  autosubmit: boolean = false
) => {
  const newForm = form.clone();

  if (newForm.missingObjects.has(formObject.key)) {
    newForm.missingObjects
      .get(formObject.key)
      .updateAttribute(attribute, inputvalue);
  } else {
    newForm.completeObjects.forEach(completeObject => {
      if (completeObject.has(formObject.key)) {
        completeObject
          .get(formObject.key)
          .updateAttribute(attribute, inputvalue);
      }
    });
  }

  const riskAllEntered =
    newForm.key !== "AddInformationAboutRisks" ||
    newForm.missingObjects.first.attributeCollection.all.filter(
      attr => attr.value === null
    ).length === 0;

  if (autosubmit && newForm.isValid && riskAllEntered) {
    return loadModularUI(newForm.connectKey, newForm.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: newForm.formdata,
      updateModel: newForm
    });
  }

  return updateModel(newForm);
};

export const connector = compose(
  connect(mapStateToProps, {
    onAttributeChange: updateRiskForm,
    removeModel
  }),
  modularui(
    "Form",
    ({ href, location }) => href || `${location.pathname}${location.search}`,
    { propName: "form", method: HTTP_METHODS.POST }
  )
);

// Export connected component for default use
export default connector(ApplyForMortgageForm);
