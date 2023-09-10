import {
  CheckboxDatabaseProperty,
  CheckboxDatabasePropertyInput,
} from "./CheckboxDatabaseProperty";
import {
  CreatedTimeDatabaseProperty,
  CreatedTimeDatabasePropertyInput,
} from "./CreatedTimeDatabaseProperty";
import {
  DateDatabaseProperty,
  DateDatabasePropertyInput,
} from "./DateDatabaseProperty";
import {
  EmailDatabaseProperty,
  EmailDatabasePropertyInput,
} from "./EmailDatabaseProperty";
import {
  CreatedByDatabaseProperty,
  CreatedByDatabasePropertyInput,
} from "./CreatedByDatabaseProperty";
import {
  FilesDatabaseProperty,
  FilesDatabasePropertyInput,
} from "./FilesDatabaseProperty";
import {
  FormulaDatabaseProperty,
  FormulaDatabasePropertyInput,
} from "./FormulaDatabaseProperty";
import {
  LastEditedByDatabaseProperty,
  LastEditedByDatabasePropertyInput,
} from "./LastEditedByDatabaseProperty";
import {
  MultiSelectDatabaseProperty,
  MultiSelectDatabasePropertyInput,
} from "./MultiSelectDatabaseProperty";
import {
  NumberDatabaseProperty,
  NumberDatabasePropertyInput,
} from "./NumberDatabaseProperty";
import {
  PeopleDatabaseProperty,
  PeopleDatabasePropertyInput,
} from "./PeopleDatabaseProperty";
import {
  PhoneNumberDatabaseProperty,
  PhoneNumberDatabasePropertyInput,
} from "./PhoneNumberDatabaseProperty";
import {
  RelationDatabaseProperty,
  RelationDatabasePropertyInput,
} from "./RelationDatabaseProperty";
import {
  RichTextDatabaseProperty,
  RichTextDatabasePropertyInput,
} from "./RichTextDatabaseProperty";
import {
  RollupDatabaseProperty,
  RollupDatabasePropertyInput,
} from "./RollupDatabaseProperty";
import {
  SelectDatabaseProperty,
  SelectDatabasePropertyInput,
} from "./SelectDatabaseProperty";
import {
  StatusDatabaseProperty,
  StatusDatabasePropertyInput,
} from "./StatusDatabaseProperty";
import {
  TitleDatabaseProperty,
  TitleDatabasePropertyInput,
} from "./TitleDatabaseProperty";
import {
  UrlDatabaseProperty,
  UrlDatabasePropertyInput,
} from "./UrlDatabaseProperty";
import {
  LastEditedTimeDatabaseProperty,
  LastEditedTimeDatabasePropertyInput,
} from "./LastEditedTimeDatabaseProperty";

export type DatabaseProperty =
  | CheckboxDatabaseProperty
  | CreatedByDatabaseProperty
  | CreatedTimeDatabaseProperty
  | DateDatabaseProperty
  | EmailDatabaseProperty
  | FilesDatabaseProperty
  | FormulaDatabaseProperty
  | LastEditedByDatabaseProperty
  | LastEditedTimeDatabaseProperty
  | MultiSelectDatabaseProperty
  | NumberDatabaseProperty
  | PeopleDatabaseProperty
  | PhoneNumberDatabaseProperty
  | RelationDatabaseProperty
  | RichTextDatabaseProperty
  | RollupDatabaseProperty
  | SelectDatabaseProperty
  | StatusDatabaseProperty
  | TitleDatabaseProperty
  | UrlDatabaseProperty;

export type DatabasePropertyInput =
  | CheckboxDatabasePropertyInput
  | CreatedByDatabasePropertyInput
  | CreatedTimeDatabasePropertyInput
  | DateDatabasePropertyInput
  | EmailDatabasePropertyInput
  | FilesDatabasePropertyInput
  | FormulaDatabasePropertyInput
  | LastEditedByDatabasePropertyInput
  | LastEditedTimeDatabasePropertyInput
  | MultiSelectDatabasePropertyInput
  | NumberDatabasePropertyInput
  | PeopleDatabasePropertyInput
  | PhoneNumberDatabasePropertyInput
  | RelationDatabasePropertyInput
  | RichTextDatabasePropertyInput
  | RollupDatabasePropertyInput
  | SelectDatabasePropertyInput
  | StatusDatabasePropertyInput
  | TitleDatabasePropertyInput
  | UrlDatabasePropertyInput;
