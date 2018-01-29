// @flow
import React from "react";
import createAttribute from "beinformed/components/FormAttribute/createAttribute";
import CaptchaInput from "beinformed/components/FormInput/CaptchaInput";

const WrappedCaptchaInput = props => (
  <CaptchaInput
    captchaConstraints={props.attribute.captchaConstraints}
    {...props}
  />
);

export default createAttribute(WrappedCaptchaInput);
