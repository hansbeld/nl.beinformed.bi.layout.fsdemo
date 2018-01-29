// @flow
import React from "react";
import createAttribute from "beinformed/components/FormAttribute/createAttribute";
import DatetimeInput from "beinformed/components/FormInput/DatetimeInput";

const WrappedDateTimeInput = props => (
  <DatetimeInput
    {...props}
    mindate={props.attribute.mindate}
    maxdate={props.attribute.maxdate}
    format={props.attribute.format}
    placeholder={
      props.attribute.placeholder === ""
        ? props.attribute.formatLabel
        : props.attribute.placeholder
    }
  />
);

export default createAttribute(WrappedDateTimeInput);
