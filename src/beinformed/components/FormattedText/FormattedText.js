// @flow
import React from "react";
import textile from "textilejs";
/**
 * Render pre formatted *sanitized* text.
 * {@see https://facebook.github.io/react/tips/dangerously-set-inner-html.html}
 */
const FormattedText = ({
  className,
  dataName,
  text
}: {
  className?: string,
  dataName?: string,
  text: string
}) => (
  <div
    className={className}
    data-name={dataName}
    dangerouslySetInnerHTML={{
      __html: textile(text)
    }}
  />
);

export default FormattedText;
