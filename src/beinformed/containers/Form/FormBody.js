// @flow
import { connect } from "react-redux";

import FormBody from "beinformed/components/Form/FormBody";
import { updateFormAttribute } from "beinformed/containers/Form/actions";

import type FormModel from "beinformed/models/form/FormModel";
import type FormObjectModel from "beinformed/models/form/FormObjectModel";
import type { Connector } from "react-redux";

type FormBodyContainerProps = {
  form: FormModel,
  formLayout?: "vertical" | "horizontal",
  autosubmit?: boolean
};

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
