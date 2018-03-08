/**
 * ATTRIBUTES
 */

declare type AttributeSetData = {
  [string]: Array<AttributeSetAttributeData> | AttributeSetAttributeData
};
declare type AttributeSetAttributeData = {
  [CustomAttributeName: string]: string | number | null
};
declare type AttributeSetContributions = {
  label: string,
  attributes: AttributeCollectionContributions
};

declare type AttributeCollectionData =
  | Array<FormElementJSON>
  | Array<ActionFieldsJSON>
  | GroupJSON
  | ListItemJSON
  | CaseViewJSON
  | AttributeSetAttributeData;

declare type AttributeCollectionContributions = Array<{
  [CustomAttributeName: string]: AttributeContributionsJSON
}>;

declare type AttributeJSON = {
  key: string,
  value: string | null,
  static?: boolean | null,
  _links?: {
    [linkKey: string]: LinkJSON,
    lookupservice?: LinkJSON
  },
  dynamicschema?: Array<Object> | { [string]: Array<Object> },
  dynamicschemaId?: string,
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

declare type CommonAttributeContributionsJSON = {
  label: string,
  _links?: {
    concept: LinkContributionsJSON
  },
  mandatory?: boolean,
  readonly?: boolean,
  assistant?: string,
  placeholder?: string,
  layouthint: Array<string>
};

declare type StringAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "string",
  displaysize: number,
  maxLength: number,
  regexp?:
    | string
    | "[1-9]{1}[0-9]{3}[s]?[a-zA-Z]{2}"
    | "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
  regexpvalidationmessage?: string,
  layouthint?: Array<
    "zipcode" | "email" | "bankaccountnumber" | "iban" | "bsn" | "xml" | string
  >
};

declare type PasswordAttributeContributionsJSON = StringAttributeContributionsJSON & {
  type: "password",
  displaysize: number,
  constraints?: {
    upperAndLowerCaseMandatory?: boolean,
    minNumberOfNumericCharacters?: number,
    minNumberOfSpecialCharacters?: number,
    maxSequenceOfIdenticalCharacters?: number,
    usernameConstraint?: boolean,
    maxSequenceOfUsernameCharacters?: boolean,
    usernameField?: string,
    uniquePasswordsLookback?: boolean,
    regexConstraint?: Array<{ regex: string, messageKey: string }>
  }
};

declare type DateTimeAttributeContributionsJSON = StringAttributeContributionsJSON & {
  type: "date" | "time" | "datetime",
  format?: string,
  formatLabel?: string
};

declare type NumberAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "number",
  format?: string,
  decimalSeparator?: string,
  groupingSeparator?: string,
  minimum?: number,
  maximum?: number,
  currencySymbol?: string
};

declare type ChoiceAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "choice" | "string" | "array",
  layouthint: Array<
    "combobox" | "radiobutton" | "checkbox" | "listview" | string
  >,
  enumerated: boolean,
  multiplechoice: boolean,
  optionMode: "static" | "dynamic" | "dynamicWithThreshold" | "lookup",
  dynamicschemaId?: string,
  falseAllowed?: boolean,
  options?: Array<ChoiceAttributeOptionContributionsJSON>,
  content?: {
    optionElements?: ContentElement
  }
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

declare type CompositeAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "range" | "composite" | "numberrange" | "daterange",
  children: Array<{
    [childKey: string]: AttributeContributionsJSON
  }>
};

declare type HelpTextAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "string",
  mandatory: false,
  text: string,
  readonly: true
};

declare type LabelAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "string",
  mandatory: false,
  readonly: true,
  layouthint: Array<"label" | string>
};

declare type MemoAttributeContributionsJSON = StringAttributeContributionsJSON & {
  type: "string",
  rows: number,
  columns: number,
  formatted: boolean
};

declare type UploadAttributeContributionsJSON = StringAttributeContributionsJSON & {
  type: "binary",
  multiple: boolean,
  allowedExtensions: Array<string>,
  allowedMimeTypes: Array<string>,
  uploadMaxFileSize: number
};

declare type CaptchaAttributeContributionsJSON = CommonAttributeContributionsJSON & {
  type: "captcha"
};
