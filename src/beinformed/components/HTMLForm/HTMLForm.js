// @flow
import React from "react";
import classNames from "classnames";

import type Href from "beinformed/models/href/Href";

import "./HTMLForm.scss";

type HTMLFormProps = {
  action?: Href,
  children?: any,
  className?: string,
  horizontal?: boolean,
  method?: "post" | "get",
  name: string,
  onSubmit: Function
};

/**
 * Render a HTML form
 */
const HTMLForm = ({
  action,
  children,
  className,
  horizontal,
  method = "post",
  name,
  onSubmit
}: HTMLFormProps) => {
  const actionHref = action ? action.absolutepath : null;

  const formClass = classNames(className, {
    horizontal: horizontal === true
  });

  return (
    <form
      className={formClass}
      method={method}
      action={actionHref}
      name={name}
      onSubmit={e => {
        e.preventDefault();

        return onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default HTMLForm;
