// @flow
import React, { Component } from "react";
import classNames from "classnames";

import CheckIcon from "mdi-react/CheckIcon";
import AlertCircleOutlineIcon from "mdi-react/AlertCircleOutlineIcon";
import AlertOutlineIcon from "mdi-react/AlertOutlineIcon";
import InformationOutlineIcon from "mdi-react/InformationOutlineIcon";

import { NOTIFICATION_TYPES } from "beinformed/constants/Constants";

import { Message } from "beinformed/i18n";

import type { ErrorResponse } from "beinformed/models";

import "./Notification.scss";

type NotificationProps = {
  messageType: NotificationTypes,
  message: {
    id: string | null,
    defaultMessage?: string | null,
    parameters?: Object | null
  },
  error: ErrorResponse | null,
  render: boolean,
  onDismiss: (e: SyntheticEvent<*>) => void
};

class Notification extends Component<NotificationProps> {
  getNotificationClass() {
    return classNames("alert alert-dismissible notification", {
      "alert-success": this.props.messageType === NOTIFICATION_TYPES.SUCCESS,
      "alert-info": this.props.messageType === NOTIFICATION_TYPES.INFO,
      "alert-warning": this.props.messageType === NOTIFICATION_TYPES.WARNING,
      "alert-danger": this.props.messageType === NOTIFICATION_TYPES.ERROR
    });
  }

  renderIcon() {
    switch (this.props.messageType) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <CheckIcon className="textAfter" />;
      case NOTIFICATION_TYPES.ERROR:
        return <AlertCircleOutlineIcon className="textAfter" />;
      case NOTIFICATION_TYPES.WARNING:
        return <AlertOutlineIcon className="textAfter" />;
      default:
        return <InformationOutlineIcon className="textAfter" />;
    }
  }

  render() {
    const { message, error, render, onDismiss } = this.props;
    if (render) {
      const notificationClass = this.getNotificationClass();

      const errorMessage =
        error &&
        error.id === "Error.GeneralError" &&
        error.exception &&
        error.exception.message
          ? error.exception.message
          : null;

      return (
        <div className={notificationClass} role="alert">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={onDismiss}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {this.renderIcon()}
          <Message
            id={message.id}
            defaultMessage={message.defaultMessage}
            data={message.parameters}
          />
          {errorMessage && (
            <div className="ml-4 small error-detail">{errorMessage}</div>
          )}
        </div>
      );
    }

    return null;
  }
}

export default Notification;
