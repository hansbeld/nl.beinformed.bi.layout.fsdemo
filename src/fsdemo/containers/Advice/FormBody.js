// @flow
import { connect } from "react-redux";

import FormBody from "fsdemo/components/Advice/FormBody";

import { updateFormAttribute } from "fsdemo/containers/Advice/actions";

import prefillForm from "fsdemo/containers/Form/prefillForm";

import type { FormBodyProps } from "beinformed/containers/Form/FormBody";
import type { Connector } from "react-redux";

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ({
  form: ownProps.form,
  formLayout: "horizontal"
});

export const connector: Connector<
  FormBodyContainerProps,
  FormBodyProps
> = connect(mapStateToProps, {
  onAttributeChange: updateFormAttribute
});

export default connector(prefillForm(FormBody));
