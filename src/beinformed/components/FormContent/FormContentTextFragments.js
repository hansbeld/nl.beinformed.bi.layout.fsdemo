// @flow
import React from "react";
import classNames from "classnames";

type textFragmentType = {
  type: string,
  text: string
};

type FormContentTextFragmentsProps = {
  textfragments: textFragmentType[],
  className: string
};

/**
 * Concept text fragments
 */
const FormContentTextFragments = ({
  textfragments,
  className
}: FormContentTextFragmentsProps) =>
  textfragments.length > 0 ? (
    <div
      className={classNames(
        "textfragment-elements concept-textfragments",
        className
      )}
    >
      {textfragments.map((textfragment, idx) => (
        <p key={`${textfragment.type}-${idx}`}>
          {textfragment.text
            ? textfragment.text.split("\n").map((textLine, i) => (
                <span key={`line-${i}`}>
                  {textLine}
                  <br />
                </span>
              ))
            : "-"}
        </p>
      ))}
    </div>
  ) : null;

export default FormContentTextFragments;
