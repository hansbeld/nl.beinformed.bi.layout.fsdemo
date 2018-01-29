// @flow
import type {
  startProgressType,
  finishProgressType,
  resetProgressType
} from "beinformed/modules/ProgressIndicator/redux/ProgressIndicatorActions";
import type {
  dismissNotificationType,
  showNotificationActionType
} from "beinformed/modules/Notification/redux/NotificationActions";
import type {
  receiveFormType,
  formFinishedType,
  cancelFormType,
  cancelAllFormsType,
  previousFormType,
  updateAttributeType
} from "beinformed/modules/Form/redux/FormActions";
import type {
  receiveApplicationType,
  resetApplicationType
} from "beinformed/modules/Application/redux/ApplicationActions";
import type { receiveQuickSearchType } from "beinformed/modules/CaseSearch/redux/CaseSearchActions";
import type { receiveCaseViewType } from "beinformed/modules/CaseView.js/redux/CaseViewActions";
import type {
  locationChangeType,
  currentLocationType,
  hydrateStateType
} from "beinformed/modules/Router/redux/RouterActions";
import type { receiveConceptDetailType } from "beinformed/modules/ConceptDetail/redux/ConceptDetailActions";
import type { receiveConceptIndexType } from "beinformed/modules/ConceptIndex/redux/ConceptIndexActions";
import type { receiveContentIndexType } from "beinformed/modules/ContentIndex/redux/ContentIndexActions";
import type {
  requestContentDetailType,
  receiveContentDetailType,
  receiveContentTOCType
} from "beinformed/modules/ContentDetail/redux/ContentDetailActions";
import type { receiveLocaleType } from "beinformed/modules/I18n/redux/I18nActions";
import type {
  UpdateLoginAttributeType,
  startLoginType,
  cancelLoginType,
  loginFailedType,
  loginSuccessType,
  logoutSuccessType
} from "beinformed/modules/Login/redux/LoginActions";
import type {
  receiveListType,
  receiveListContextType
} from "beinformed/modules/List/redux/ListActions";
import type {
  receiveModelCatalogType,
  receiveEntryDateType,
  receiveReceiveModelcatalogSearchResultType
} from "beinformed/modules/ModelCatalog/redux/ModelCatalogActions";
import type {
  selectAllListItemsType,
  selectListItemType
} from "beinformed/modules/MultiRowTask/redux/MultiRowTaskActions";
import type {
  receivePanelType,
  openTabType
} from "beinformed/modules/Panel/redux/PanelActions";
import type { receiveTabType } from "beinformed/modules/Tab/redux/TabActions";
import type { receiveComponentType } from "beinformed/modules/TabComponent/redux/TabComponentActions";
import type {
  receiveProfileType,
  closeUserProfileType
} from "beinformed/modules/UserProfile/redux/UserProfileActions";

declare type Action =
  | receiveApplicationType
  | resetApplicationType
  | startProgressType
  | finishProgressType
  | resetProgressType
  | dismissNotificationType
  | showNotificationActionType
  | receiveFormType
  | formFinishedType
  | cancelFormType
  | cancelAllFormsType
  | previousFormType
  | updateAttributeType
  | receiveQuickSearchType
  | receiveCaseViewType
  | receiveConceptDetailType
  | receiveConceptIndexType
  | receiveContentIndexType
  | requestContentDetailType
  | receiveContentDetailType
  | receiveContentTOCType
  | receiveLocaleType
  | receiveListType
  | receiveListContextType
  | UpdateLoginAttributeType
  | startLoginType
  | cancelLoginType
  | loginFailedType
  | loginSuccessType
  | logoutSuccessType
  | receiveModelCatalogType
  | receiveEntryDateType
  | receiveReceiveModelcatalogSearchResultType
  | selectAllListItemsType
  | selectListItemType
  | receivePanelType
  | openTabType
  | receiveTabType
  | receiveComponentType
  | locationChangeType
  | currentLocationType
  | hydrateStateType
  | receiveProfileType
  | closeUserProfileType;

declare type GetState = () => Object;
declare type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
declare type PromiseAction = Promise<Action>;
declare type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
