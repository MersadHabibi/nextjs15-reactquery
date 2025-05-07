import { type Permission } from "@/permissions/permission.types";

export interface TGetUserInfo {
  id: string;
  name: string;
  email: string;
  role: Permission[];
}
