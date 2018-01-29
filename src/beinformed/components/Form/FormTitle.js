// @flow
import React from "react";
import classNames from "classnames";

const FormTitle = ({
  title,
  isModal = false
}: {
  title: string,
  isModal?: boolean
}) => (
  <h2 className={classNames("form-title", { "modal-title": isModal })}>
    {title}
  </h2>
);

export default FormTitle;
