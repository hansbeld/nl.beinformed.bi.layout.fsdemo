/**
 * ATTRIBUTES
 */

declare type AttributeCollectionData =
  | Array<FormElementJSON>
  | Array<ActionFieldsJSON>
  | GroupJSON
  | ListItemJSON
  | CaseViewJSON;

declare type AttributeCollectionContributions = Array<{
  [string]: AttributeContributionsJSON
}>;

declare type AttributeJSON = {
  key: string,
  value: string | null,
  static?: boolean | null,
  _links?: {
    [linkKey: string]: LinkJSON | Array<LinkJSON>,
    lookupservice?: LinkJSON
  },
  dynamicschema?: Array<Object> | { [string]: Array<Object> },
  options?: Array<Object>,
  message?: {
    id: string,
    parameters?: MessageParametersType
  },
  isResult?: boolean,
  referenceDate?: string,
  children?: Array<AttributeJSON>
};

declare type AttributeContributionsJSON =
  | StringAttributeContributionsJSON
  | NumberAttributeContributionsJSON
  | ChoiceAttributeContributionsJSON
  | DateTimeAttributeContributionsJSON
  | CompositeAttributeContributionsJSON
  | HelpTextAttributeContributionsJSON
  | LabelAttributeContributionsJSON
  | MemoAttributeContributionsJSON
  | UploadAttributeContributionsJSON
  | CaptchaAttributeContributionsJSON;

declare type StringAttributeContributionsJSON = {
  type: "string",
  label: string,
  mandatory?: boolean,
  postfix?: string,
  displaysize?: number,
  regexp?:
    | string
    | "[1-9]{1}[0-9]{3}[s]?[a-zA-Z]{2}"
    | "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
  layouthint?: Array<
    "zipcode" | "email" | "bankaccountnumber" | "iban" | "bsn" | "xml" | string
  >,
  assistant?: string,
  maxLength?: number
};

declare type DateTimeAttributeContributionsJSON = {
  type: "date" | "time" | "datetime",
  label: string,
  mandatory?: boolean,
  format?: string,
  formatLabel?: string,
  layouthint?: Array<string>
};

declare type NumberAttributeContributionsJSON = {
  type: "number",
  label: string,
  mandatory?: boolean,
  format?: string,
  formatLabel?: string,
  layouthint?: Array<string>,
  groupingSeparator?: string,
  decimalSeparator?: string,
  assistant?: string,
  minimum?: number,
  maximum?: number
};

declare type ChoiceAttributeContributionsJSON = {
  type: "choice" | "string",
  label: string,
  mandatory?: boolean,
  optionMode: "static" | "dynamic",
  multiplechoice: boolean,
  _links?: {
    concept: LinkContributionsJSON
  },
  layouthint: Array<
    "combobox" | "radiobutton" | "checkbox" | "listview" | string
  >,
  enumerated: boolean,
  options?: Array<ChoiceAttributeOptionContributionsJSON>
};

declare type ChoiceAttributeOptionContributionsJSON = {
  code?: string,
  key?: string,
  label: string,
  _links?: {
    concept: LinkContributionsJSON
  },
  children?: Array<ChoiceAttributeOptionContributionsJSON>
};

declare type CompositeAttributeContributionsJSON = {
  type: "range" | "composite" | "numberrange" | "daterange",
  label: string,
  mandatory?: boolean,
  layouthint?: Array<string>,
  children: Array<{
    [childKey: string]: AttributeContributionsJSON
  }>
};

declare type HelpTextAttributeContributionsJSON = {
  type: "string",
  label: string,
  mandatory: false,
  text: string,
  readonly: true,
  layouthint?: Array<string>
};

declare type LabelAttributeContributionsJSON = {
  type: "string",
  label: string,
  mandatory: false,
  readonly: true,
  layouthint: Array<"label" | string>
};

declare type MemoAttributeContributionsJSON = {
  type: "string",
  label: string,
  mandatory?: boolean,
  rows: number,
  columns: number,
  formatted: boolean,
  layouthint?: Array<string>
};

declare type UploadAttributeContributionsJSON = {
  type: "binary",
  label: string,
  mandatory?: boolean,
  multiple: boolean,
  uploadMaxFileSize: number,
  layouthint?: Array<string>
};

declare type CaptchaAttributeContributionsJSON = {
  type: "captcha",
  label: string,
  mandatory?: boolean,
  layouthint?: Array<string>
}