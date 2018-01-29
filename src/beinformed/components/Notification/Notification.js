// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { NOTIFICATION_TYPES } from "beinformed/constants/Constants";

import { Message } from "beinformed/containers/I18n/Message";

import Icon from "beinformed/components/Icon/Icon";

import type ErrorResponse from "beinformed/models/error/ErrorResponse";

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

  /**
   * Correct notification icon
   */
  getIconName() {
    switch (this.props.messageType) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "check";
      case NOTIFICATION_TYPES.ERROR:
        return "exclamation-circle";
      case NOTIFICATION_TYPES.WARNING:
        return "exclamation-triangle";
      default:
        return "info-circle";
    }
  }

  render() {
    const { message, error, render, onDismiss } = this.props;
    if (render) {
      return (
        <div className={this.getNotificationClass()} role="alert">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={onDismiss}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Icon name={this.getIconName()} textAfter />
          <Message
            id={message.id}
            defaultMessage={message.defaultMessage}
            data={message.parameters}
          />
          {error &&
            error.id === "Error.GeneralError" &&
            error.exception &&
            error.exception.message && (
              <div className="ml-4 small error-detail">
                {error.exception.message}
              </div>
            )}
        </div>
      );
    }

    return null;
  }
}

export default Notification;
