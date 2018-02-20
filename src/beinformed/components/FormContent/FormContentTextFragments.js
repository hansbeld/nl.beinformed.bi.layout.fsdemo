// @flow
import React from "react";
import classNames from "classnames";
import FormattedText from "beinformed/components/FormattedText/FormattedText";

type textFragmentType = {
  type: string,
  label: string,
  text: string
};

type FormContentTextFragmentsProps = {
  textfragments: Array<textFragmentType>,
  className: string,
  renderLabel: boolean
};

/**
 * Concept text fragments
 */
const FormContentTextFragments = ({
  textfragments,
  className,
  renderLabel
}: FormContentTextFragmentsProps) =>
  textfragments.length > 0 ? (
    <div
      className={classNames(
        "textfragment-elements concept-textfragments",
        className
      )}
    >
      {textfragments.map((textfragment, idx) => (
        <div key={`${textfragment.type}-${idx}`}>
          {renderLabel && <h4>{textfragment.label}</h4>}
          {textfragment.text
            ? textfragment.text.split("\n").map((textLine, i) => (
                <span key={`line-${i}`}>
                  {i > 0 && <br />}
                  <FormattedText className="introtext" text={textLine} />
                </span>
              ))
            : "-"}
        </div>
      ))}
    </div>
  ) : null;

export default FormContentTextFragments;
