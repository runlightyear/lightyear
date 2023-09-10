import { BaseUser } from "./BaseUser";

export interface BotUser extends BaseUser {
  type: "bot";
  bot: {
    owner: {
      type: "workspace" | "user";
      workspaceName: string | null;
    };
  };
}
