import { type Permissions } from "@/permissions/permission.types";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  accessPerms?: Permissions[];
  education: string | null;
  email: string;
  fixPhoneNumber: string | null;
  birthdate: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userPermission?: {
    category: {
      id: string;
      name: string;
      parents?: string[];
    }[];
  };
  phoneNumber: string;
  address?: string;
  avatar?: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
