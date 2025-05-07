import { type User, type Permission } from "@/types/auth";

export const hasPermission = (permission: Permission, user: User): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

export const hasAnyPermission = (
  permissions: Permission[],
  user: User,
): boolean => {
  if (!user) return false;
  return permissions.some((permission) =>
    user.permissions.includes(permission),
  );
};

export const hasAllPermissions = (
  permissions: Permission[],
  user: User,
): boolean => {
  if (!user) return false;
  return permissions.every((permission) =>
    user.permissions.includes(permission),
  );
};
