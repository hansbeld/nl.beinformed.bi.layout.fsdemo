// @flow
import React from "react";
import classNames from "classnames";
import FilterIcon from "mdi-react/FilterIcon";

import LookupInput from "beinformed/components/FormInput/LookupInput";
import Button from "beinformed/components/Button/Button";
import FormAssistant from "beinformed/components/FormAssistant/FormAssistant";
import FormLabel from "beinformed/components/FormLabel/FormLabel";
import FormContent from "beinformed/components/FormContent/FormContent";
import FormContentPopover from "beinformed/components/FormContent/FormContentPopover";
import { Message } from "beinformed/containers/I18n/Message";
import type LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type LookupAttributeProps = {
  attribute: LookupAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  optionContentConfiguration?: ContentConfigurationElements,
  id: string,
  isFilter?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  onChange: (attribute: LookupAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render Lookup
 */
const LookupAttribute = ({
  attribute,
  className,
  questionContentConfiguration,
  optionContentConfiguration,
  isFilter,
  name,
  id,
  formLayout,
  onChange,
  onBlur,
  onFocus
}: LookupAttributeProps) => {
  const groupClass = classNames("form-group row", "lookupwidget", className, {
    "has-danger": attribute.inError()
  });

  return (
    <div className={groupClass} data-name={name}>
      <FormLabel
        htmlFor={id || name}
        attribute={attribute}
        contentConfiguration={questionContentConfiguration}
        formLayout={formLayout}
      />
      <div className="col">
        <LookupInput
          name={name}
          id={id}
          isMultiple={attribute.isMultiple}
          options={attribute.options}
          optionContentConfiguration={optionContentConfiguration}
          readOnly={attribute.readonly}
          lookupLink={attribute.lookupLink}
          layouthint={attribute.layouthint}
          onChange={option => onChange(attribute, option.code)}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {isFilter && (
            <Button name="filter" className="filter-button">
              <FilterIcon />
              <Message
                id="FilterButton.Label"
                defaultMessage="Filter"
                screenreaderOnly
              />
            </Button>
          )}
        </LookupInput>
        <FormContentPopover
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
        {(attribute.assistantMessage ||
          attribute.constraintCollection.hasItems) && (
          <FormAssistant
            assistantMessage={attribute.assistantMessage}
            constraints={attribute.constraintCollection}
            errors={attribute.errorCollection}
            value={attribute.inputvalue}
          />
        )}
        <FormContent
          concept={attribute.concept}
          contentConfiguration={questionContentConfiguration}
        />
      </div>
    </div>
  );
};

export default LookupAttribute;
