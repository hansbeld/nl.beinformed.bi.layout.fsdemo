import type AttributeModel from "../src/beinformed/models/attributes/AttributeModel";
import type BSNAttributeModel from "../src/beinformed/models/attributes/BSNAttributeModel";
import type ChoiceAttributeModel from "../src/beinformed/models/attributes/ChoiceAttributeModel";
import type CompositeAttributeModel from "../src/beinformed/models/attributes/CompositeAttributeModel";
import type DateAttributeModel from "../src/beinformed/models/attributes/DateAttributeModel";
import type HelptextAttributeModel from "../src/beinformed/models/attributes/HelptextAttributeModel";
import type IBANAttributeModel from "../src/beinformed/models/attributes/IBANAttributeModel";
import type ImageAttributeModel from "../src/beinformed/models/attributes/ImageAttributeModel";
import type LabelAttributeModel from "../src/beinformed/models/attributes/LabelAttributeModel";
import type LookupAttributeModel from "../src/beinformed/models/attributes/LookupAttributeModel";
import type MemoAttributeModel from "../src/beinformed/models/attributes/MemoAttributeModel";
import type MoneyAttributeModel from "../src/beinformed/models/attributes/MoneyAttributeModel";
import type NumberAttributeModel from "../src/beinformed/models/attributes/NumberAttributeModel";
import type PasswordAttributeModel from "../src/beinformed/models/attributes/PasswordAttributeModel";
import type RangeAttributeModel from "../src/beinformed/models/attributes/RangeAttributeModel";
import type StringAttributeModel from ".../src/beinformed/models/attributes/StringAttributeModel";
import type TimeAttributeModel from "../src/beinformed/models/attributes/TimeAttributeModel";
import type TimestampAttributeModel from "../src/beinformed/models/attributes/TimestampAttributeModel";
import type UploadAttributeModel from "../src/beinformed/models/attributes/UploadAttributeModel";
import type XMLAttributeModel from "../src/beinformed/models/attributes/XMLAttributeModel";

declare type AttributeType =
  | AttributeModel
  | BSNAttributeModel
  | ChoiceAttributeModel
  | DateAttributeModel
  | HelptextAttributeModel
  | IBANAttributeModel
  | ImageAttributeModel
  | LabelAttributeModel
  | LookupAttributeModel
  | MemoAttributeModel
  | MoneyAttributeModel
  | NumberAttributeModel
  | PasswordAttributeModel
  | CompositeAttributeModel
  | StringAttributeModel
  | TimeAttributeModel
  | TimestampAttributeModel
  | UploadAttributeModel
  | XMLAttributeModel;

declare type RangeChildAttributeType =
  | NumberAttributeModel
  | DateAttributeModel
  | TimestampAttributeModel
  | TimeAttributeModel;

declare type OptionType = {
  code: string,
  label: string,
  selected?: boolean,
  children?: OptionType[] | null,
  _links?: Object,
  count?: number
};
