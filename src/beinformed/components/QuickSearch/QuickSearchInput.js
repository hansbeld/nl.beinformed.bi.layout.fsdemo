// @flow
import React from "react";

import { withMessage, Message } from "beinformed/containers/I18n/Message";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import Button from "beinformed/components/Button/Button";
import Icon from "beinformed/components/Icon/Icon";
import DatetimeInput from "beinformed/components/FormInput/DatetimeInput";
import SelectInput from "beinformed/components/FormInput/SelectInput";
import TextInput from "beinformed/components/FormInput/TextInput";

import "./QuickSearchInput.scss";

import type FilterModel from "beinformed/models/filters/FilterModel";

type QuickSearchInputProps = {
  message: messageFunctionType,
  searchOption: FilterModel,
  value: string,
  onChange: (value: string) => void
};

/**
 * Render quick search input
 */
const QuickSearchInput = ({
  message,
  searchOption,
  value,
  onChange
}: QuickSearchInputProps) => {
  const SearchInput =
    searchOption.type === "datefilter" ? DatetimeInput : TextInput;

  const placeHolderText = message(
    "QuickSearchInput.Placeholder",
    "Search by {SEARCHOPTION_LABEL}",
    {
      SEARCHOPTION_LABEL: searchOption.label
    }
  );

  if (searchOption.attribute instanceof ChoiceAttributeModel) {
    return [
      <SelectInput
        key="search-input"
        className="quicksearch-input"
        name={searchOption.attribute.name}
        options={searchOption.attribute.options.all.map(option => {
          const newOption = option;

          newOption.selected = option.code === value;

          return newOption;
        })}
        ariaLabel={placeHolderText}
        placeholder={placeHolderText}
        onChange={onChange}
      />,
      <Button
        key="search-button"
        name="button-search"
        className="btn-quick-search ml-1"
        type="submit"
      >
        <Icon name="search" />
        <Message
          id="QuickSearchInput.SearchLabel"
          defaultMessage="Search"
          screenreaderOnly
        />
      </Button>
    ];
  }

  return [
    <SearchInput
      key="search-input"
      className="quicksearch-input"
      name={searchOption.attribute.name}
      value={value}
      inError={searchOption.attribute.inError()}
      ariaLabel={placeHolderText}
      placeholder={placeHolderText}
      autoComplete="off"
      onChange={onChange}
    />,
    <Button
      key="search-button"
      name="searchinputbutton"
      className="btn-quick-search ml-1"
      type="submit"
    >
      <Icon name="search" />
      <Message
        id="QuickSearchInput.SearchLabel"
        defaultMessage="Search"
        screenreaderOnly
      />
    </Button>
  ];
};

export default withMessage(QuickSearchInput);
