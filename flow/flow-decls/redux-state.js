import { AuthState } from "beinformed/redux/reducers/AuthReducer";
import { ErrorState } from "beinformed/redux/reducers/ErrorReducer";
import { I18nState } from "beinformed/redux/reducers/I18nReducer";
import { ModularUIState } from "beinformed/redux/reducers/ModularUIReducer";
import { MultiRowTaskState } from "beinformed/redux/reducers/MultiRowTaskReducer";
import { NotificationState } from "beinformed/redux/reducers/NotificationReducer";
import { ProgressIndicatorState } from "beinformed/redux/reducers/ProgressIndicatorReducer";

declare type State =
  | AuthState
  | ErrorState
  | I18nState
  | ModularUIState
  | MultiRowTaskState
  | NotificationState
  | ProgressIndicatorState;
