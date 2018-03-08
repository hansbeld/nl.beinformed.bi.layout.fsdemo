// @flow
import React from "react";
import classNames from "classnames";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownButton from "beinformed/components/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownItem from "beinformed/components/Dropdown/DropdownItem";

import "./QuickSearchChooser.scss";

import type { FilterModel } from "beinformed/models";

type QuickSearchChooserType = {
  active: FilterModel,
  className?: string,
  options: FilterModel[],
  onChange: (option: FilterModel) => void
};

/**
 * Render pagesize chooser
 */
const QuickSearchChooser = ({
  className,
  options,
  active,
  onChange
}: QuickSearchChooserType) => {
  const dropdownClass = classNames("quicksearchchooser", className);

  return (
    <Dropdown className={dropdownClass}>
      <DropdownButton>{active.label}</DropdownButton>
      <DropdownChildren>
        {options.map((option, idx) => (
          <DropdownItem
            key={`${option.name}-${idx}`}
            value={option.name}
            onClick={() => onChange(option)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownChildren>
    </Dropdown>
  );
};

export default QuickSearchChooser;
