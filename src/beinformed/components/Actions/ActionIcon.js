// @flow
import React from "react";
import classNames from "classnames";

import PlusIcon from "mdi-react/PlusIcon";
import PencilIcon from "mdi-react/PencilIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import SettingsIcon from "mdi-react/SettingsIcon";
import CheckCircleOutlineIcon from "mdi-react/CheckCircleOutlineIcon";

type IconTypes =
  | "form"
  | "create"
  | "update"
  | "delete"
  | "general"
  | "contextaware"
  | string;

type ActionIconProps = {
  icon: string,
  isCompleteStage: boolean,
  type: IconTypes,
  hasTextAfter: boolean
};

/**
 * Render correct icon for action
 */
const ActionIcon = ({
  isCompleteStage = false,
  hasTextAfter = true,
  type,
  icon
}: ActionIconProps) => {
  const iconClass = classNames({
    textAfter: hasTextAfter
  });

  if (isCompleteStage) {
    return <CheckCircleOutlineIcon className={iconClass} />;
  }

  if (icon) {
    return icon;
  }

  switch (type) {
    case "create":
      return <PlusIcon className={iconClass} />;
    case "update":
      return <PencilIcon className={iconClass} />;
    case "delete":
      return <DeleteIcon className={iconClass} />;
    default:
      return <SettingsIcon className={iconClass} />;
  }
};

export default ActionIcon;
