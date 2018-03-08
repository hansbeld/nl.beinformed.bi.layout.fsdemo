// @flow
import { connect } from "react-redux";

import FormBody from "beinformed/components/Form/FormBody";
import { updateFormAttribute } from "beinformed/containers/Form/actions";

import type { FormModel, FormObjectModel } from "beinformed/models";
import type { Connector } from "react-redux";

type FormBodyContainerProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  autosubmit?: boolean
};

export type FormBodyProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  autosubmit?: boolean,
  onAttributeChange: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    inputvalue: string,
    autosubmit?: boolean
  ) => void,
  onAttributeClick?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType,
    inputvalue: string
  ) => void,
  onAttributeBlur?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType
  ) => void,
  onAttributeFocus?: (
    form: FormModel,
    object: FormObjectModel,
    attribute: AttributeType
  ) => void
};

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  form: ownProps.form,
  formLayout: ownProps.formLayout || "vertical",
  autosubmit: ownProps.autosubmit || false
});

export const connector: Connector<
  FormBodyContainerProps,
  FormBodyProps
> = connect(mapStateToProps, {
  onAttributeChange: updateFormAttribute
});

export default connector(FormBody);
