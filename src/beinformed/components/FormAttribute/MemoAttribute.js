// @flow
import React from "react";

import createAttribute from "beinformed/components/FormAttribute/createAttribute";
import TextareaInput from "beinformed/components/FormInput/TextareaInput";
import WysiwygInput from "beinformed/components/FormInput/WysiwygInput";

const MemoInput = props =>
  props.attribute.formatted ? (
    <WysiwygInput {...props} />
  ) : (
    <TextareaInput {...props} />
  );

export default createAttribute(MemoInput);
