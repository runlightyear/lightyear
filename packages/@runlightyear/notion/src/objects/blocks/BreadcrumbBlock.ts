import { BaseBlock } from "./BaseBlock";

export interface BreadcrumbBlock extends BaseBlock {
  type: "breadcrumb";
  breadcrumb: {};
}

export interface BreadcrumbBlockInput {
  breadcrumb: {};
}
