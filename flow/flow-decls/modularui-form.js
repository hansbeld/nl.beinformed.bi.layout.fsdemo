declare type ConstraintValidateMethodType = (value: string) => boolean;

declare type FormJSONResponse = {
  formresponse: FormJSON
};
declare type FormJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  missing?: FormMissingJSON,
  errors?: FormErrorsJSON,
  results?: FormResultsJSON,
  complete?: boolean,
  success?: FormSuccessJSON,
  tokens?: null | Array<string>
};
declare type FormContributionsJSONResponse = {
  [FormKey: string]: FormContributionsJSON
};
declare type FormContributionsJSON = {
  label: string,
  resourcetype: "Form",
  objects: {
    [FormObjectKey: string]: FormObjectContributionsJSON
  }
};

declare type InstrumentTypes =
  | "decision"
  | "classification"
  | "calculator"
  | "";
declare type FormObjectContributionsJSON = {
  instrumentType?: InstrumentTypes,
  dialogMode?: "wizard" | "form" | "form-tree" | "level-by-level",
  buttonLabels?: {
    next?: string,
    previous?: string,
    finish?: string
  },
  repeatable: boolean,
  label: string,
  content?: FormObjectContributionsContentJSON,
  attributes: Array<{ [AttributeName: string]: AttributeContributionsJSON }>,
  assistent?: string,
  introText?: string
};

declare type ContentDecisionResultJSON = {
  label: string,
  description?: string,
  attributes: Array<string>,
  positiveResultElements: ContentElement,
  negativeResultElements: ContentElement,
  resultElements: ContentElement,
  layouthint: Array<string>
};

declare type ContentClassificationResultJSON = {
  label: string,
  description?: string,
  attributes: Array<string>,
  positiveResultElements: ContentElement,
  negativeResultElements: ContentElement,
  resultElements: ContentElement,
  conceptOrder: string,
  renderMode: string,
  layouthint: Array<string>
};

declare type ContentCalculatorResultJSON = {
  label: string,
  description?: string,
  attributes: Array<string>,
  resultElements: ContentElement,
  layouthint: Array<string>
};

declare type ContentQuestionElementJSON = {
  givenAnswerElements?: ContentElement,
  questionElements?: ContentElement,
  optionElements?: ContentElement
};

declare type ContentIntermediateResultElementJSON = {
  label: string,
  description: string | null,
  attributes: Array<string>,
  calculatedResultElements: ContentElement,
  positiveResultElements: ContentElement,
  negativeResultElements: ContentElement,
  allResultElements: ContentElement,
  layouthint: Array<string>
};

declare type ContentEndResultElementJSON = Array<{
  // buttons?: Array<{
  //   type: string,
  //   label: string
  // }>,
  // reasoningTrace?: boolean,
  decisionResult?: ContentDecisionResultJSON,
  classificationResult?: ContentClassificationResultJSON,
  calculatorResult?: ContentCalculatorResultJSON
}>;

declare type ContentGivenAnswersElementJSON = {
  label: string
};

declare type FormObjectContributionsContentJSON = {
  questions?: ContentQuestionElementJSON,
  intermediateResults?: ContentIntermediateResultElementJSON,
  results?: ContentEndResultElementJSON
};

declare type ContentElement = Array<{
  labelElement?: {
    label: string,
    labelTypes: Array<string>,
    layouthint?: Array<string>
  },
  contentElement?: {
    label: string,
    sectionReferenceTypes: Array<string>,
    layouthint?: Array<
      | "popup"
      | "render-child-sections"
      | "render-section-label"
      | "full-width"
      | "half-width"
      | string
    >
  },
  textFragmentElement?: {
    label: string,
    textFragmentTypes: Array<string>,
    layouthint?: Array<"popup" | "full-width" | "half-width" | string>
  },
  propertyElement?: {
    label: string,
    propertyTypes: Array<string>,
    layouthint?: Array<string>
  }
}>;

declare type FormMissingJSON = {
  anchors?: Array<FormAnchorJSON>,
  param?: Array<FormParamJSON>,
  suggestion?: string,
  dynamicschema?: Object,
  layouthint?: Array<string>
};

declare type FormErrorsJSON = Array<FormErrorJSON>;

declare type FormErrorJSON = {
  id: string,
  message?: string,
  properties?: MessageParametersType,
  anchor?: FormAnchorJSON,
  param?: FormErrorParamJSON
};

declare type FormResultsJSON = Array<FormAnchorJSON>;

declare type FormAnchorJSON = {
  objectid: string,
  elementid?: string,
  index?: number,
  "index-identifier"?: string,
  static?: string,
  value?: string,
  suggestion?: string,
  elements?: Array<FormElementJSON>,
  results?: Array<FormElementJSON>
};

declare type FormErrorParamJSON = {
  name: string
};

declare type FormElementJSON = {
  elementid: string,
  suggestion?: string,
  suggstions?: Array<string>,
  value?: string,
  values?: Array<string>,
  static?: boolean,
  _links?: Object,
  dynamicschema?: Array<Object>
};

declare type FormParamJSON = {
  elementid: string,
  message: string
};

declare type FormSuccessJSON = {
  redirect: string,
  data: Object
};
