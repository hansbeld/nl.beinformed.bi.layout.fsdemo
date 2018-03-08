import ApplicationModel from "beinformed/models/application/ApplicationModel";
import CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import DetailModel from "beinformed/models/detail/DetailModel";
import EditableListModel from "beinformed/models/list/EditableListModel";
import FormModel from "beinformed/models/form/FormModel";
import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";
import ListModel from "beinformed/models/list/ListModel";
import ListDetailModel from "beinformed/models/list/ListDetailModel";
import TabModel from "beinformed/models/tab/TabModel";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import UserModel from "beinformed/models/user/UserModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";
import ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";
import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";
import BusinessScenarioModel from "beinformed/models/concepts/BusinessScenarioModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import ContentIndexModel from "beinformed/models/content/ContentIndexModel";
import ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import ContentModel from "beinformed/models/content/ContentModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";
import RelatedConceptsModel from "beinformed/models/content/RelatedConceptsModel";

export type ResolvableModels =
  | ApplicationModel
  | CaseSearchModel
  | CaseViewModel
  | ListDetailModel
  | DetailModel
  | EditableListModel
  | FormModel
  | GroupingPanelModel
  | ListModel
  | TabModel
  | TaskGroupModel
  | UserModel
  | UserServicesModel
  | ModelCatalogModel
  | ConceptIndexModel
  | ConceptDetailModel
  | BusinessScenarioModel
  | ConceptTypeDetailModel
  | ContentIndexModel
  | ContentTOCModel
  | ContentModel
  | ContentTypeModel
  | RelatedConceptsModel;
