// @flow
import React from "react";
import CloseIcon from "mdi-react/CloseIcon";

import { KEYCODES } from "beinformed/constants/Constants";
import { withMessage } from "beinformed/containers/I18n/Message";
import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";

import "./LookupInputActiveOption.scss";

type LookupInputActiveOptionProps = {
  disabled?: boolean,
  message: messageFunctionType,
  option: ChoiceAttributeOptionModel,
  readOnly?: boolean,
  optionContentConfiguration?: ContentConfigurationElements,
  onClick: (option: ChoiceAttributeOptionModel) => void
};

/**
 * Render active options
 */
const LookupInputActiveOption = ({
  message,
  disabled,
  option,
  readOnly,
  optionContentConfiguration,
  onClick
}: LookupInputActiveOptionProps) => (
  <span
    key={option.code}
    className="lookup-active-option"
    data-value={option.code}
  >
    <span>{getChoiceOptionLabel(option, optionContentConfiguration)}</span>
    {!readOnly &&
      !disabled && (
        <button
          className="lookup-remove-active-option"
          tabIndex="0"
          aria-label={message(
            "LookupInput.AltText.RemoveActiveOption",
            "Remove option"
          )}
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
          <CloseIcon />
        </button>
      )}
  </span>
);

export default withMessage(LookupInputActiveOption);
