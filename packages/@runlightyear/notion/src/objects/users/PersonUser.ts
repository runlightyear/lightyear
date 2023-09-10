import { BaseUser } from "./BaseUser";

export interface PersonUser extends BaseUser {
  type: "person";
  person: {
    email: string;
  };
}
