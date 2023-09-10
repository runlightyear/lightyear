import { BaseBlock } from "./BaseBlock";

export interface MentionDatabaseBlock extends BaseBlock {
  type: "database";
  database: {
    id: string;
  };
}

export interface MentionDateBlock extends BaseBlock {
  type: "date";
  date: {
    start: string;
  };
}

export interface MentionLinkPreviewBlock extends BaseBlock {
  type: "link_preview";
  linkPreview: {
    url: string;
  };
}

export interface MentionPageBlock extends BaseBlock {
  type: "page";
  page: {
    id: string;
  };
}

export interface MentionUserBlock extends BaseBlock {
  type: "user";
  user: {
    id: string;
  };
}

// TODO: Handle input
