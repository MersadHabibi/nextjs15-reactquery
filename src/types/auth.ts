export type Permission =
  | "superuser"
  | "admin"
  | "support"
  | "fileManagement"
  | "meetManagement";

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
}
