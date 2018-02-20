// @flow
import Settings from "config/Settings.json";

/**
 * Retrieve setting by id from the setting configuration
 */
export const getSetting = (setting: string) => {
  if (Settings[setting]) {
    return Settings[setting].value;
  }

  throw new Error(`Setting with name ${setting} not found in setting file`);
};
/**
 * Indicates if contributions and routeprovider should be cached
 */
export const USE_CACHE = getSetting("USE_CACHE");

/**
 * Base path
 *
 * This uses contextPath set from request in server and client
 *
 * When requesting a remote server with CORS enabled, add the origin, for example:
 * export const BEINFORMED_PATH = 'http://192.168.128.61:8080/BeInformed';
 */
const tempBASE = global.CONTEXT_PATH || getSetting("DEFAULT_CONTEXTPATH");
export const BASE = tempBASE.trim();

/**
 * Path to the contributions api end point
 * /contributions uri part is added through the _links in the data service
 */
export const MODULARUI_CONTRIBUTIONS = "/contributions";

/**
 * Application uri
 * @type {string}
 */
const APPLICATION_URI = "/";

/**
 * Base Path
 * @type {string}
 */
export const APPLICATION_PATH = BASE + APPLICATION_URI;

export const CONTENT_PATH = `${BASE}/content`;

/**
 * Upload Path
 * @type {string}
 */
export const UPLOAD_PATH = `${BASE}/uploadFile`;

/**
 * Captcha Path
 */
export const CAPTCHA_PATH = `${BASE}/captchaServices`;

/**
 * Separator for parameters of a list, makes it possible to render multiple lists on a page in a non-js environment
 * @type {string}
 */
export const PARAMETER_SEPARATOR = "~";

/**
 * Model Catalog & Source Browser
 */
export const TIMEVERSION_FILTER_NAME = "entryDate";

/**
 * Parameter name for the viewtype toggle
 * @type {string}
 */
const PARAMETER_OVERVIEW_VIEWTYPE = "viewType";
export const UI_PARAMETERS = [PARAMETER_OVERVIEW_VIEWTYPE];

export const ISO_DATE_FORMAT = "YYYY-MM-DD";
export const ISO_TIME_FORMAT = "HH:mm:ss";
export const ISO_TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS";

// Timeout settings
export const HIDE_NOTIFICATION_TIMEOUT = getSetting(
  "HIDE_NOTIFICATION_TIMEOUT"
);

export const NOTIFICATION_MSG_MAP = {
  create: "Notification.Msg.Create",
  update: "Notification.Msg.Update",
  delete: "Notification.Msg.Delete",
  generic: "Notification.Msg.Generic"
};

// Key codes
export const KEYCODES = {
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

export const IS_SYNC = typeof dataFetcher !== "undefined";
export const IS_SERVER = IS_SYNC;

export const NOTIFICATION_TYPES = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR"
};

// FORMS
export const ALWAYS_COMMIT_FORM = getSetting("ALWAYS_COMMIT_FORM");
export const HORIZONTAL_FORM_LABEL_CLASS = getSetting(
  "HORIZONTAL_FORM_LABEL_CLASS"
);
export const RENDER_QUESTION_LABELS = getSetting("RENDER_QUESTION_LABELS");

// LIST
export const AVAILABLE_LIST_VIEWS = getSetting("AVAILABLE_LIST_VIEWS");

// SUPPORTED HTTP METHODS
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST"
};

export const LOGIN_PATH = getSetting("LOGIN_PATH") || "/signin";
export const LOGOUT_PATH = getSetting("LOGOUT_PATH") || "/signout";
export const CHANGEPASSWORD_PATH =
  getSetting("CHANGEPASSWORD_PATH") || "/change-password";
export const USERPROFILE_PATH = getSetting("USERPROFILE_PATH") || "/user";

/**
 * Constants file
 */
export default {
  APPLICATION_PATH,
  NO_EVENT_EMIT: false
};
