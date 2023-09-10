import { CheckboxProperty, CheckboxPropertyInput } from "./CheckboxProperty";
import { CreatedTimeProperty } from "./CreatedTimeProperty";
import { CreatedByProperty } from "./CreatedByProperty";
import { DateProperty, DatePropertyInput } from "./DateProperty";
import { EmailProperty, EmailPropertyInput } from "./EmailProperty";
import { FilesProperty, FilesPropertyInput } from "./FilesProperty";
import { FormulaProperty } from "./FormulaProperty";
import { LastEditedByProperty } from "./LastEditedByProperty";
import { LastEditedTimeProperty } from "./LastEditedTimeProperty";
import {
  MultiSelectProperty,
  MultiSelectPropertyInput,
} from "./MultiSelectProperty";
import { NumberProperty, NumberPropertyInput } from "./NumberProperty";
import { PeopleProperty, PeoplePropertyInput } from "./PeopleProperty";
import {
  PhoneNumberProperty,
  PhoneNumberPropertyInput,
} from "./PhoneNumberProperty";
import { RelationProperty, RelationPropertyInput } from "./RelationProperty";
import { RichTextProperty, RichTextPropertyInput } from "./RichTextProperty";
import { SelectProperty, SelectPropertyInput } from "./SelectProperty";
import { StatusProperty, StatusPropertyInput } from "./StatusProperty";
import { TitleProperty, TitlePropertyInput } from "./TitleProperty";
import { UniqueIdProperty } from "./UniqueIdProperty";
import { UrlProperty, UrlPropertyInput } from "./UrlProperty";
import { VerificationProperty } from "./VerificationProperty";
import { RollupProperty } from "./RollupProperty";

export type PageProperty =
  | CheckboxProperty
  | CreatedByProperty
  | CreatedTimeProperty
  | DateProperty
  | EmailProperty
  | FilesProperty
  | FormulaProperty
  | LastEditedByProperty
  | LastEditedTimeProperty
  | MultiSelectProperty
  | NumberProperty
  | PeopleProperty
  | PhoneNumberProperty
  | RelationProperty
  | RichTextProperty
  | RollupProperty
  | SelectProperty
  | StatusProperty
  | TitleProperty
  | UniqueIdProperty
  | UrlProperty
  | VerificationProperty;

export type PagePropertyInput =
  | CheckboxPropertyInput
  | DatePropertyInput
  | EmailPropertyInput
  | FilesPropertyInput
  | MultiSelectPropertyInput
  | NumberPropertyInput
  | PeoplePropertyInput
  | PhoneNumberPropertyInput
  | RelationPropertyInput
  | RichTextPropertyInput
  | SelectPropertyInput
  | StatusPropertyInput
  | TitlePropertyInput
  | UrlPropertyInput;
