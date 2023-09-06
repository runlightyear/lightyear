export interface Model {
  id: string;
  object: "model";
  created: number;
  ownedBy: string;
  permission: unknown;
}
