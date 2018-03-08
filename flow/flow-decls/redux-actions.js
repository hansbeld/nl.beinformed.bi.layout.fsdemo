// @flow
import type {
  ModularUISuccessType,
  ModularUIRemoveKeyType,
  updateStatusType
} from "beinformed/modularui";

import type { saveErrorType } from "beinformed/containers/Error/actions";

import type {
  receiveLocaleType,
  setLocalesType
} from "beinformed/containers/LanguageSelector/actions";

import type {
  selectAllListItemsType,
  selectListItemType
} from "beinformed/containers/MultiRowTask/actions";

import type {
  dismissNotificationType,
  showNotificationActionType
} from "beinformed/containers/Notification/actions";

import type {
  startProgressType,
  finishProgressType,
  resetProgressType,
  updateProgressType
} from "beinformed/containers/ProgressIndicator/actions";

import type {
  loginFailedType,
  loginSuccessType,
  changePasswordType
} from "beinformed/containers/SignIn/actions";

import type { logoutSuccessType } from "beinformed/containers/SignOut/actions";

declare type ReduxAction =
  | updateStatusType
  | ModularUISuccessType
  | ModularUIRemoveKeyType
  | saveErrorType
  | receiveLocaleType
  | setLocalesType
  | selectAllListItemsType
  | selectListItemType
  | dismissNotificationType
  | showNotificationActionType
  | startProgressType
  | finishProgressType
  | resetProgressType
  | updateProgressType
  | loginFailedType
  | loginSuccessType
  | changePasswordType
  | logoutSuccessType;

declare type GetState = () => Object;
declare type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
declare type PromiseAction = Promise<ReduxAction>;
declare type Dispatch = (
  action: ReduxAction | ThunkAction | PromiseAction | Array<ReduxAction>
) => any;
