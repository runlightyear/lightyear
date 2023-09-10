import { Color } from "../../types/Color";

export interface BaseRichBlock {
  annotations: Annotations;
  plainText: string;
  href: string | null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: Color;
}

export interface BaseRichBlockInput {
  annotations?: Annotations;
  href?: string | null;
}
