import type ApplicationModel from "../src/beinformed/models/application/ApplicationModel";
import type CaseSearchModel from "../src/beinformed/models/search/CaseSearchModel";
import type CaseViewModel from "../src/beinformed/models/caseview/CaseViewModel";
import type DetailModel from "../src/beinformed/models/detail/DetailModel";
import type EditableListModel from "../src/beinformed/models/list/EditableListModel";
import type FormModel from "../src/beinformed/models/form/FormModel";
import type GroupingPanelModel from "../src/beinformed/models/panels/GroupingPanelModel";
import type ListModel from "../src/beinformed/models/list/ListModel";
import type TabModel from "../src/beinformed/models/tab/TabModel";
import type TaskGroupModel from "../src/beinformed/models/taskgroup/TaskGroupModel";
import type UserModel from "../src/beinformed/models/user/UserModel";
import type UserServicesModel from "../src/beinformed/models/user/UserServicesModel";
import type ModelCatalogModel from "../src/beinformed/models/modelcatalog/ModelCatalogModel";
import type ConceptIndexModel from "../src/beinformed/models/concepts/ConceptIndexModel";
import type ConceptDetailModel from "../src/beinformed/models/concepts/ConceptDetailModel";
import type ConceptTypeDetailModel from "../src/beinformed/models/concepts/ConceptTypeDetailModel";
import type ContentIndexModel from "../src/beinformed/models/content/ContentIndexModel";
import type ContentTOCModel from "../src/beinformed/models/content/ContentTOCModel";
import type ContentModel from "../src/beinformed/models/content/ContentModel";
import type ContentTypeModel from "../src/beinformed/models/content/ContentTypeModel";
import type RelatedConceptsModel from "../src/beinformed/models/content/RelatedConceptsModel";

declare type ResolvableModels =
  | ApplicationModel
  | CaseSearchModel
  | CaseViewModel
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
  | ConceptTypeDetailModel
  | ContentIndexModel
  | ContentTOCModel
  | ContentModel
  | ContentTypeModel
  | RelatedConceptsModel;
