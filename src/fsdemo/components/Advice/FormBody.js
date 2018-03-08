// @flow
import React, { Component } from "react";

import FormObjects from "beinformed/components/FormObjects/FormObjects";
import FormErrorMessages from "beinformed/components/FormError/FormErrorMessages";

import AttributeRenderer from "fsdemo/components/FormAttribute/AttributeRenderer";

import type { FormModel } from "beinformed/models";

type FormBodyProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  AttributeRenderer: any,
  onAttributeChange: Function,
  onAttributeBlur?: Function,
  onAttributeClick?: Function,
  onAttributeFocus?: Function
};

type FormBodyState = {
  showFormErrors: boolean
};

/**
 * Render form objects of a form
 */
class FormBody extends Component<FormBodyProps, FormBodyState> {
  static defaultProps = {
    AttributeRenderer
  };

  constructor(props: FormBodyProps) {
    super(props);

    this.state = {
      showFormErrors: true
    };
  }

  handleErrorDismiss = () => {
    this.setState({
      showFormErrors: false
    });
  };

  render() {
    const {
      form,
      formLayout,
      onAttributeChange,
      onAttributeBlur,
      onAttributeClick,
      onAttributeFocus
    } = this.props;

    const formObjects = [...form.completeObjects, form.missingObjects];

    return (
      <div className="form-body">
        {this.state.showFormErrors &&
          form.hasServerErrors() && (
            <FormErrorMessages
              form={form}
              onDismiss={this.handleErrorDismiss}
            />
          )}

        {formObjects.map((formObject, i) => (
          <FormObjects
            key={`${formObject.key}-${i}`}
            className="form-objects-missing"
            objects={formObject}
            id={form.key}
            formLayout={formLayout}
            AttributeRenderer={AttributeRenderer}
            onAttributeChange={(...args) => onAttributeChange(form, ...args)}
            onAttributeBlur={(...args) =>
              onAttributeBlur ? onAttributeBlur(form, ...args) : void 0
            }
            onAttributeClick={(...args) =>
              onAttributeClick ? onAttributeClick(form, ...args) : void 0
            }
            onAttributeFocus={(...args) =>
              onAttributeFocus ? onAttributeFocus(form, ...args) : void 0
            }
          />
        ))}
      </div>
    );
  }
}

export default FormBody;
