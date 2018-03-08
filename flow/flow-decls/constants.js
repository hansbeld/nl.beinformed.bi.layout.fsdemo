import {
  HTTP_METHODS,
  NOTIFICATION_TYPES
} from "beinformed/constants/Constants";

declare type HttpMethods = $Keys<typeof HTTP_METHODS>;
declare type NotificationTypes = $Keys<typeof NOTIFICATION_TYPES>;

// eslint-disable-next-line camelcase
declare var __webpack_public_path__: string;
