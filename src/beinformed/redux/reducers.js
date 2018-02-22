// @flow
import ModularUIReducer from "beinformed/redux/reducers/ModularUIReducer";

import I18nReducer from "beinformed/redux/reducers/I18nReducer";
import AuthReducer from "beinformed/redux/reducers/AuthReducer";
import ErrorReducer from "beinformed/redux/reducers/ErrorReducer";
import NotificationReducer from "beinformed/redux/reducers/NotificationReducer";
import ProgressIndicatorReducer from "beinformed/redux/reducers/ProgressIndicatorReducer";
import MultiRowTaskReducer from "beinformed/containers/MultiRowTask/MultiRowTaskReducer";

const createReducer = (asyncReducers?: Object) => ({
  modularui: ModularUIReducer,
  i18n: I18nReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  notification: NotificationReducer,
  progressindicator: ProgressIndicatorReducer,
  multirowtask: MultiRowTaskReducer,
  ...asyncReducers
});

export { createReducer };
