// @flow
import React from "react";
import classNames from "classnames";
import DotsHorizontal from "mdi-react/DotsHorizontalIcon";

import ButtonGroup from "beinformed/components/Button/ButtonGroup";
import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownButton from "beinformed/components/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";

import Action from "beinformed/components/Actions/Action";

import { Message } from "beinformed/i18n";

import type { ActionModel } from "beinformed/models";

type ActionChooserType = {
  actions: Array<ActionModel>,
  align?: "left" | "right",
  className?: string,
  direction?: "down" | "up",
  dropdownTreshold?: number,
  size?: "small" | "large" | "default"
};

/**
 * Render one or more actions
 */
const ActionChooser = ({
  actions,
  align,
  className,
  direction,
  dropdownTreshold = 1,
  size
}: ActionChooserType) => {
  const dropdownClass = classNames("actionchooser", className);

  const buttonActions = actions.filter((action, i) => i < dropdownTreshold);
  const dropdownActions = actions.filter((action, i) => i >= dropdownTreshold);

  const buttonGroupClass = classNames({
    "btn-group-sm": size === "small",
    "btn-group-lg": size === "large",
    "float-right": align === "right",
    "mr-1": align === "right"
  });

  const dropdownActionComponents = dropdownActions.map(action => (
    <Action key={action.name} action={action} isDropdown isModal />
  ));

  return (
    <ButtonGroup className={buttonGroupClass}>
      {buttonActions.map(action => (
        <Action key={action.name} action={action} isButton isModal />
      ))}

      {dropdownActions.length > 0 && (
        <Dropdown align={align} direction={direction} className={dropdownClass}>
          <DropdownButton
            className="btn-light actionchooser-toggle"
            size={size}
            renderToggleIcon={false}
          >
            <DotsHorizontal />
            <Message
              id="ActionChooser.ShowActions"
              defaultMessage="Show actions"
              screenreaderOnly
            />
          </DropdownButton>
          <DropdownChildren>{dropdownActionComponents}</DropdownChildren>
        </Dropdown>
      )}
    </ButtonGroup>
  );
};

export default ActionChooser;
