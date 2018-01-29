// @flow
import LayoutHintConfiguration from "config/LayoutHintConfig.json";

/**
 * Retrieve layout hint by id from the layout hint configuration
 */
const getHint = (hint: string) => {
  if (LayoutHintConfiguration[hint]) {
    return LayoutHintConfiguration[hint].hint;
  }

  return "";
};

export const ICON = getHint("ICON");
export const MANDATORY = getHint("MANDATORY");

/*
 * --------------------------------
 * APPLICATION
 * --------------------------------
 */
export const FULL_PAGE_FORMS = getHint("FULL_PAGE_FORMS");
export const RENDER_MODAL = getHint("RENDER_MODAL");

/*
 * --------------------------------
 * CASEVIEW AND GROUPING PANELS
 * --------------------------------
 */

/**
 * Renders the caseview as an overview, where (by default) all panels are expanded. The grouping-panel panels are shown as tabs
 * @type {string}
 */
export const OVERVIEW = getHint("OVERVIEW");

/*
 * --------------------------------
 * INLINE EDIT
 * --------------------------------
 */

/**
 * Renders a list as an editable list
 * @type {string}
 */
export const INLINE_EDIT_LIST = getHint("INLINE_EDIT_LIST");

/**
 * Inidicates that the inline edit list can duplicate rows. Needs a create task present
 * @type {string}
 */
export const INLINE_EDIT_CAN_DUPLICATE = getHint("INLINE_EDIT_CAN_DUPLICATE");

/**
 * Marks an update action as the update task to use to update an inline edit list item
 * @type {string}
 */
export const INLINE_EDIT_UPDATE_ACTION = getHint("INLINE_EDIT_UPDATE_ACTION");

/**
 * Marks a create action as the create action to use to create a new inline edit list item
 * @type {string}
 */
export const INLINE_EDIT_CREATE_ACTION = getHint("INLINE_EDIT_CREATE_ACTION");

/**
 * Marks a create action as the duplicate action to use to duplicate an inline edit list item
 * @type {string}
 */
export const INLINE_EDIT_CLONE_ACTION = getHint("INLINE_EDIT_CLONE_ACTION");

/**
 * Marks a delete action as the delete action to use as the delete inline edit list item action
 * @type {string}
 */
export const INLINE_EDIT_DELETE_ACTION = getHint("INLINE_EDIT_DELETE_ACTION");

/*
 * --------------------------------
 * STAGES
 * --------------------------------
 */

/**
 * Renders the caseview as a stage view, where (by default) each panel is shown as tab, where the grouping-panel panels are expanded
 * @type {string}
 */
export const STAGESVIEW = getHint("STAGESVIEW");

/*
 * --------------------------------
 * DYNAMIC ACTIVITY PLAN
 * --------------------------------
 */

export const DAP_ACTIVITIES_EXECUTABLE = getHint("DAP_ACTIVITIES_EXECUTABLE");
export const DAP_ACTIVITIES_PERFORMED = getHint("DAP_ACTIVITIES_PERFORMED");
export const DAP_STAGES_EXECUTABLE = getHint("DAP_STAGES_EXECUTABLE");
export const DAP_STAGES_PERFORMED = getHint("DAP_STAGES_PERFORMED");
export const DAP_COMPLETE_STAGE = getHint("DAP_COMPLETE_STAGE");

/*
 * --------------------------------
 * SELECT DEPENDENT ATTRIBUTES
 * --------------------------------
 */
export const DEPENDENT_INPUT_CONTROL = "dependent-control";
export const DEPENDENT_INPUT_ACTION_SHOW = "show";
export const DEPENDENT_INPUT_ACTION_HIDE = "hide";
export const DEPENDENT_INPUT_OPERATOR_EQUALS = "equals";
export const DEPENDENT_INPUT_OPERATOR_INCLUDES = "includes";
export const DEPENDENT_INPUT_OPERATOR_NOT_EQUALS = "notEquals";
export const DEPENDENT_INPUT_OPERATOR_NOT_INCLUDES = "notIncludes";
export const DEPENDENT_INPUT_OPTIONS_SEPARATOR = "|";

/*
 * --------------------------------
 * NOTIFY ABOUT FORM FINISH
 * --------------------------------
 */
export const NOTIFY = getHint("NOTIFY");

/*
 * --------------------------------
 * MULTIROW TASK CONSTANTS
 * --------------------------------
 */
export const MULTI_ROW_TASK = getHint("MULTI_ROW_TASK");

/*
 * --------------------------------
 * FORM FINISH RETURN
 * --------------------------------
 */
export const FORM_FINISH_RETURN = getHint("FORM_FINISH_RETURN");
export const FORM_FINISH_RETURN_RELOAD_LIST = getHint(
  "FORM_FINISH_RETURN_RELOAD_LIST"
);

/*
 * --------------------------------
 * MODELCATALOG
 * --------------------------------
 */
export const HIDE_MODELCATALOG = getHint("HIDE_MODELCATALOG");

/*
 * --------------------------------
 * LISTS
 * --------------------------------
 * Set on lists that have the option 'show one result in table' unchecked. hides the lists and shows only the details
 */
export const SHOW_ONE_RESULT_AS_DETAIL = getHint("SHOW_ONE_RESULT_AS_DETAIL");
export const GOTO_CASEVIEW = getHint("GOTO_CASEVIEW");

/*
 * --------------------------------
 * FORM CONTENT
 * --------------------------------
 * Can be set on event and instrument questions to hide it's label
 */
export const HIDE_LABEL = getHint("HIDE_LABEL");

// Set on configuration of instruments to show content in a popover on a label
export const POPUP = "popup";
export const RENDER_CHILD_SECTIONS = "render-child-sections";
export const RENDER_SECTION_LABEL = "render-section-label";
export const EMPHASIS = getHint("EMPHASIS");
export const FULL_WIDTH = "full-width";
export const HALF_WIDTH = "half-width";
export const PROPERTY_SHOW_WHEN_EMPTY = "show-when-empty";

// ATRIBUTES
export const ALIGN_LEFT = getHint("ALIGN_LEFT");
export const ALIGN_CENTER = getHint("ALIGN_CENTER");
export const ALIGN_RIGHT = getHint("ALIGN_RIGHT");

export default getHint;
