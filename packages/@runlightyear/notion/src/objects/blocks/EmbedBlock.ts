import { BaseBlock, BaseBlockInput } from "./BaseBlock";

export interface EmbedBlock extends BaseBlock {
  type: "embed";
  embed: Embed;
}

export interface Embed {
  url: string;
}

export interface EmbedBlockInput extends BaseBlockInput {
  embed: EmbedInput;
}

export interface EmbedInput {
  url: string;
}
