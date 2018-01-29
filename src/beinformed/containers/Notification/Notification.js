// @flow
import { connect } from "react-redux";

import { dismissNotification } from "beinformed/containers/Notification/actions";

import Notification from "beinformed/components/Notification/Notification";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  messageType: state.notification.messageType,
  message: state.notification.message,
  error: state.notification.error,
  render: state.notification.render
});

export const connector = connect(mapStateToProps, {
  onDismiss: dismissNotification
});

export default connector(Notification);
