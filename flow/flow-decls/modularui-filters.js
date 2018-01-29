// FILTERS
declare type FilterCollectionJSON = {
  [FilterKey: string]: FilterJSON
};
declare type FilterCollectionContributionsJSON = {
  listkey?: string,
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  contexts?: Array<ContextContributionsJSON>,
  dynamicschema?: Object
};

declare type FilterJSON =
  | FilterParamJSON
  | ChoiceFilterParamJSON
  | RangeNumberFilterParamJSON
  | RangeDateFilterParamJSON
  | AssignmentsFilterParamJSON;

declare type FilterContributionsJSON =
  | StringFilterContributionsJSON
  | DateFilterContributionsJSON
  | ChoiceFilterContributionsJSON
  | RangeDateFilterContributionsJSON
  | RangeNumberFilterContributionsJSON
  | AssignmentsFilterContributionsJSON;

declare type FilterParamJSON = {
  param: string,
  name?: string,
  value?: string | null,
  dynamicschema?: Object
};
declare type StringFilterContributionsJSON = {
  type: "stringfilter",
  label: string,
  layouthint: Array<string>
};
declare type DateFilterContributionsJSON = {
  type: "datefilter",
  label: string,
  layouthint: Array<string>,
  format: string
};

declare type ChoiceFilterParamJSON = {
  param: string,
  name?: string,
  value?: string | null,
  options?: Array<{
    key: string | null,
    selected?: boolean | null,
    count?: number | null,
    label?: string
  }>,
  _links?: {
    lookupservice?: LinkJSON
  },
  dynamicschema?: Object
};
declare type ChoiceFilterContributionsJSON = {
  type: "choicefilter",
  label: string,
  layouthint: Array<"combobox" | "radiobutton" | "checkbox" | string>,
  multiplechoice: boolean,
  options: Array<{
    code: string,
    label: string
  }>
};
declare type RangeNumberFilterParamJSON = {
  name?: string,
  startNumber: {
    param: string,
    value: string | null
  },
  endNumber: {
    param: string,
    value: string | null
  },
  dynamicschema?: Object
};
declare type RangeDateFilterParamJSON = {
  name?: string,
  startDate: {
    param: string,
    value: string | null
  },
  endDate: {
    param: string,
    value: string | null
  },
  dynamicschema?: Object
};

declare type RangeNumberFilterContributionsJSON = {
  type: "numberrangefilter",
  label: string,
  layouthint: Array<string>,
  children: [
    {
      startNumber: {
        label: string,
        name: string,
        layouthint: Array<string>,
        format: string,
        minimum?: number,
        maximum?: number
      }
    },
    {
      endNumber: {
        label: string,
        name: string,
        layouthint: Array<string>,
        format: string,
        minimum?: number,
        maximum?: number
      }
    }
  ]
};
declare type RangeDateFilterContributionsJSON = {
  type: "daterangefilter",
  label: string,
  layouthint: Array<string>,
  children: [
    {
      startDate: {
        label: string,
        name: string,
        layouthint: Array<string>,
        format: string,
        minimum?: number,
        maximum?: number
      }
    },
    {
      endDate: {
        label: string,
        name: string,
        layouthint: Array<string>,
        format: string,
        minimum?: number,
        maximum?: number
      }
    }
  ]
};

declare type AssignmentsFilterParamJSON = {
  name?: string,
  USERKEY?: ChoiceFilterParamJSON,
  ASSIGNMENTTYPE?: ChoiceFilterParamJSON,
  dynamicschema?: Object
};
declare type AssignmentsFilterContributionsJSON = {
  type: "assignmentfilter",
  label: string,
  layouthint: Array<string>,
  USERKEY: ChoiceFilterContributionsJSON,
  ASSIGNMENTTYPE: ChoiceFilterContributionsJSON
};
