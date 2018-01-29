import {
  HTTP_METHODS,
  NOTIFICATION_TYPES
} from "beinformed/constants/Constants";

declare type HttpMethods = $Keys<typeof HTTP_METHODS>;
declare type NotificationTypes = $Keys<typeof NOTIFICATION_TYPES>;
