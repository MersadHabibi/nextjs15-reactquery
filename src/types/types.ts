import { type Permission } from "@/permissions/permission.types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Permission[];
}
