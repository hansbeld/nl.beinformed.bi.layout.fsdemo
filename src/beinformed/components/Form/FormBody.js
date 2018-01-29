// @flow
import React, { Component } from "react";

import FormObjects from "beinformed/components/FormObjects/FormObjects";
import FormResults from "beinformed/components/FormResults/FormResults";
import FormErrorMessages from "beinformed/components/FormError/FormErrorMessages";

import type FormModel from "beinformed/models/form/FormModel";
import type FormObjectModel from "beinformed/models/form/FormObjectModel";

export type FormBodyProps = {
  form: FormModel,
  autosubmit: boolean,
  formLayout?: "vertical" | "horizontal",
  autosubmit?: boolean,
  onAttributeChange: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    inputvalue: string,
    autoSubmit: boolean
  ) => void,
  onAttributeClick?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    inputvalue: string,
    autoSubmit: boolean
  ) => void,
  onAttributeBlur?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    autoSubmit: boolean
  ) => void,
  onAttributeFocus?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    autosubmit: boolean
  ) => void
};

type FormBodyState = {
  showFormErrors: boolean
};

/**
 * Render form objects of a form
 */
class FormBody extends Component<FormBodyProps, FormBodyState> {
  static defaultProps = {
    formLayout: "vertical",
    autosubmit: false
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

  canAutoSubmit() {
    if (this.props.form.isValid) {
      return this.props.autosubmit || false;
    }

    return false;
  }

  render() {
    const {
      form,
      formLayout,
      onAttributeChange,
      onAttributeBlur,
      onAttributeClick,
      onAttributeFocus
    } = this.props;

    return (
      <div className="form-body">
        {this.state.showFormErrors &&
          form.hasServerErrors() && (
            <FormErrorMessages
              form={form}
              onDismiss={this.handleErrorDismiss}
            />
          )}

        {form.endResultObjects.hasItems && (
          <FormResults
            id={`${form.key}-results`}
            results={form.endResultObjects}
          />
        )}

        {form.missingObjects.hasItems && (
          <FormObjects
            className="form-objects-missing"
            objects={form.missingObjects}
            id={form.key}
            formLayout={formLayout}
            onAttributeChange={(object, attribute, inputvalue) =>
              onAttributeChange(
                form,
                object,
                attribute,
                inputvalue,
                this.canAutoSubmit()
              )
            }
            onAttributeClick={(object, attribute, inputvalue) =>
              onAttributeClick
                ? onAttributeClick(
                    form,
                    object,
                    attribute,
                    inputvalue,
                    this.canAutoSubmit()
                  )
                : void 0
            }
            onAttributeBlur={(object, attribute) =>
              onAttributeBlur
                ? onAttributeBlur(form, object, attribute, this.canAutoSubmit())
                : void 0
            }
            onAttributeFocus={(object, attribute) =>
              onAttributeFocus
                ? onAttributeFocus(
                    form,
                    object,
                    attribute,
                    this.canAutoSubmit()
                  )
                : void 0
            }
          />
        )}
      </div>
    );
  }
}

export default FormBody;
