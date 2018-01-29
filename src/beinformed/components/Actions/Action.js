// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";

import ActionIcon from "beinformed/components/Actions/ActionIcon";

import { DAP_COMPLETE_STAGE } from "beinformed/constants/LayoutHints";
import type ActionModel from "beinformed/models/actions/ActionModel";

export type ActionProps = {
  action: ActionModel,
  className?: string,
  isButton?: boolean,
  isPrimary?: boolean,
  isDropdown?: boolean,
  isModal?: boolean,
  renderIcon?: boolean,
  renderLabel?: boolean
};

/**
 * Create Action link with correct icon
 */
const Action = ({
  action,
  className,
  isButton,
  isPrimary,
  isDropdown,
  isModal = false,
  renderIcon = true,
  renderLabel = true
}: ActionProps) => {
  const linkClass = classNames("btn-task", className, {
    btn: isButton,
    "btn-light":
      isButton && !isPrimary && !action.layouthint.has(DAP_COMPLETE_STAGE),
    "btn-primary":
      isButton && (isPrimary || action.layouthint.has(DAP_COMPLETE_STAGE)),
    "dropdown-item": isDropdown
  });

  return (
    <Link
      dataId={action.name}
      href={action.selfhref}
      className={linkClass}
      isModal={isModal}
    >
      {renderIcon && (
        <ActionIcon
          isCompleteStage={action.layouthint.has(DAP_COMPLETE_STAGE)}
          icon={action.icon}
          type={action.type}
          hasTextAfter={renderLabel}
        />
      )}
      {renderLabel && action.label}
    </Link>
  );
};

export default Action;
