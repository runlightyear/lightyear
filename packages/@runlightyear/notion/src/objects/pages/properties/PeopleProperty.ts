import { User } from "../../users/User";
import { PartialUser } from "../../users/PartialUser";

export interface PeopleProperty {
  id: string;
  type: "people";
  people: Array<User>;
}

export interface PeoplePropertyInput {
  people: Array<PartialUser>;
}
