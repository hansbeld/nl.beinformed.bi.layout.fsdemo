// @flow
import React from "react";
import classNames from "classnames";

import { KEYCODES } from "beinformed/constants/Constants";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";
import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";

import type {
  ChoiceAttributeOptionModel,
  ContentConfigurationElements
} from "beinformed/models";

type LookupInputOptionProps = {
  activeOption: ChoiceAttributeOptionModel | null,
  filterInput: string,
  option: ChoiceAttributeOptionModel,
  optionContentConfiguration?: ContentConfigurationElements,
  onClick: (option: ChoiceAttributeOptionModel) => void
};

/**
 * Render lookup options
 */
const LookupInputOption = ({
  activeOption,
  filterInput,
  option,
  optionContentConfiguration,
  onClick
}: LookupInputOptionProps) => {
  const optionLabel = getChoiceOptionLabel(option, optionContentConfiguration);

  const re = new RegExp(`(${filterInput})`, "ig");
  const aLabel = optionLabel
    .replace(re, "[mark]$1[mark]")
    .split("[mark]")
    .filter(mark => mark !== "");

  const label = aLabel.map((labelPart, i) => {
    if (labelPart.toLowerCase() === filterInput.toLowerCase()) {
      return <mark key={`${labelPart}-${i}`}>{labelPart}</mark>;
    }

    return labelPart;
  });

  const isActive = activeOption !== null && option.code === activeOption.code;

  const optionClass = classNames("list-group-item-action", {
    focus: isActive
  });

  return (
    <li key={option.code} className="list-group-item" data-value={option.code}>
      <div
        className={optionClass}
        tabIndex="0"
        role="option"
        aria-selected={isActive}
        onClick={e => {
          e.preventDefault();
          onClick(option);
        }}
        onKeyDown={e => {
          if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
            e.preventDefault();
            onClick(option);
          }
        }}
      >
        {label}
      </div>
      {option.concept &&
        optionContentConfiguration && (
          <FormContentRenderer
            concept={option.concept}
            contentConfiguration={optionContentConfiguration}
          />
        )}

      {option.children && (
        <ul>
          {option.children.all.map(opt => (
            <LookupInputOption
              key={opt.code}
              activeOption={activeOption}
              filterInput={filterInput}
              option={opt}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default LookupInputOption;
