// @flow
import React, { Component } from "react";

import { retrieveAttributeInput } from "fsdemo/utils/AttributeInputCache";

const prefillForm = WrappedComponent => {
  class PrefillForm extends Component {
    render() {
      const { form, ...props } = this.props;

      form.missingObjects.all.forEach(missingObject => {
        missingObject.attributeCollection.all.forEach(attribute => {
          const value = retrieveAttributeInput(attribute.key);
          if (value !== null && !attribute.isChangedSince(0)) {
            form.missingObjects
              .get(missingObject.key)
              .updateAttribute(attribute, value);
          }
        });
      });

      return <WrappedComponent form={form} {...props} />;
    }
  }

  PrefillForm.displayName = `PrefillForm(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component"})`;

  return PrefillForm;
};

export default prefillForm;
