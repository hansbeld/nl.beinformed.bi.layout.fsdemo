// @flow
import React from "react";
import createAttribute from "beinformed/components/FormAttribute/createAttribute";
import UploadInput from "beinformed/components/FormInput/UploadInput";

const WrappedUploadInput = props => (
  <UploadInput
    isMultiple={props.attribute.multiple}
    uploadConstraints={props.attribute.uploadConstraints}
    {...props}
  />
);

export default createAttribute(WrappedUploadInput);
