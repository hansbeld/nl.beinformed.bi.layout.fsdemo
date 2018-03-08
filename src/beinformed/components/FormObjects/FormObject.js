// @flow
import React from "react";
import classNames from "classnames";

import InstrumentResult from "beinformed/components/InstrumentResult/InstrumentResult";
import DefaultAttributeRenderer from "beinformed/components/FormAttribute/AttributeRenderer";
import FormattedText from "beinformed/components/FormattedText/FormattedText";
import IconPopover from "beinformed/components/Popover/IconPopover";

import { HIDE_LABEL } from "beinformed/constants/LayoutHints";
import { RENDER_QUESTION_LABELS } from "beinformed/constants/Constants";

import type { FormObjectModel } from "beinformed/models";

import "./FormObject.scss";

type FormObjectProps = {
  className?: string,
  id: string,
  object: FormObjectModel,
  formLayout?: "vertical" | "horizontal",
  AttributeRenderer: any,
  onAttributeChange?: (
    object: FormObjectModel,
    attribute: AttributeType,
    value: string
  ) => void,

  onAttributeBlur?: (object: FormObjectModel, attribute: AttributeType) => void,

  onAttributeClick?: (
    object: FormObjectModel,
    attribute: AttributeType,
    value: string
  ) => void,

  onAttributeFocus?: (object: FormObjectModel, attribute: AttributeType) => void
};

/**
 * Render form object
 */
const FormObject = ({
  className,
  object,
  id,
  formLayout,
  AttributeRenderer = DefaultAttributeRenderer,
  onAttributeChange,
  onAttributeBlur,
  onAttributeClick,
  onAttributeFocus
}: FormObjectProps) => {
  const label = object.repeatIndexLabel
    ? `${object.label} (${object.repeatIndexLabel})`
    : object.label;

  const questionContentConfiguration = object.contentConfiguration.questions
    ? object.contentConfiguration.questions.question
    : null;
  const optionContentConfiguration = object.contentConfiguration.questions
    ? object.contentConfiguration.questions.options
    : null;

  return (
    <div
      className={classNames("form-object", className)}
      data-name={object.key}
    >
      {RENDER_QUESTION_LABELS &&
        !object.layouthint.has(HIDE_LABEL) &&
        object.label && <h3 className="question-label">{label}</h3>}

      {object.assistent && (
        <IconPopover className="form-object-popover">
          {object.assistent}
        </IconPopover>
      )}

      {object.introText && (
        <FormattedText className="introtext" text={object.introText} />
      )}

      {object.attributeCollection.results.length > 0 &&
        object.contentConfiguration.intermediateResults !== null && (
          <InstrumentResult
            id={id}
            attributes={object.attributeCollection.results}
            contentConfiguration={
              object.contentConfiguration.intermediateResults
            }
          />
        )}

      {object.attributeCollection.questions.map((attribute, i) => (
        <AttributeRenderer
          key={`${id}-${attribute.name}-${i}`}
          id={`${id}-${attribute.name}`}
          name={attribute.name}
          attribute={attribute}
          formLayout={formLayout}
          questionContentConfiguration={questionContentConfiguration}
          optionContentConfiguration={optionContentConfiguration}
          enablePasswordSuggestions={false}
          onClick={(attr, inputvalue) => {
            if (onAttributeClick && onAttributeChange) {
              onAttributeChange(object, attr, inputvalue);
              return onAttributeClick(object, attr, inputvalue);
            }
            return void 0;
          }}
          onBlur={() => {
            if (onAttributeBlur) {
              return onAttributeBlur(object, attribute);
            }

            return void 0;
          }}
          onChange={(attr, inputvalue) => {
            if (onAttributeChange) {
              return onAttributeChange(object, attr, inputvalue);
            }

            return void 0;
          }}
          onFocus={() => {
            if (onAttributeFocus) {
              return onAttributeFocus(object, attribute);
            }

            return void 0;
          }}
        />
      ))}
    </div>
  );
};

export default FormObject;
