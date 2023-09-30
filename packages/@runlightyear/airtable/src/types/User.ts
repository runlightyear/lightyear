export interface User {
  id: string;
  email: string;
  permissionLevel: "none" | "read" | "comment" | "edit" | "create";
  name?: string;
  profilePicUrl?: string;
}
