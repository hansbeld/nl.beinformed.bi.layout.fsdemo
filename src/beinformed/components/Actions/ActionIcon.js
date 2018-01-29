// @flow
import React, { Component } from "react";

import Icon from "beinformed/components/Icon/Icon";

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
class ActionIcon extends Component<ActionIconProps> {
  static defaultProps = {
    isCompleteStage: false,
    hasTextAfter: true
  };

  getIcon() {
    if (this.props.isCompleteStage) {
      return "check-circle-o";
    }

    if (this.props.icon) {
      return this.props.icon;
    }

    switch (this.props.type) {
      case "create":
        return "plus";
      case "update":
        return "pencil";
      case "delete":
        return "trash-o";
      default:
        return "cog";
    }
  }

  render() {
    return <Icon name={this.getIcon()} textAfter={this.props.hasTextAfter} />;
  }
}

export default ActionIcon;
