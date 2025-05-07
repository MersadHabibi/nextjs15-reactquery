import { type User } from "@/types/types";
import { type Action, type Permission, type Subject } from "./permission.types";

// Map permissions to subject actions
const permissionMap: Record<
  Permission,
  Array<{ subject: Subject; action: Action }>
> = {
  superuser: [
    { subject: "file", action: "manage" },
    { subject: "meeting", action: "manage" },
    { subject: "user", action: "manage" },
    { subject: "report", action: "manage" },
  ],
  admin: [
    { subject: "file", action: "manage" },
    { subject: "meeting", action: "manage" },
    { subject: "user", action: "read" },
    { subject: "report", action: "read" },
  ],
  support: [
    { subject: "file", action: "read" },
    { subject: "meeting", action: "read" },
    { subject: "report", action: "read" },
  ],
  fileManagement: [
    { subject: "file", action: "create" },
    { subject: "file", action: "read" },
    { subject: "file", action: "update" },
    { subject: "file", action: "delete" },
  ],
  meetManagement: [
    { subject: "meeting", action: "create" },
    { subject: "meeting", action: "read" },
    { subject: "meeting", action: "update" },
    { subject: "meeting", action: "delete" },
  ],
};

// Check single permission
export function hasPermission(permission: Permission, user: User): boolean {
  return user.role.includes(permission);
}

// Check if user has any of the permissions
export function hasAnyPermission(
  permissions: Permission[],
  user: User,
): boolean {
  return permissions.some((permission) => user.role.includes(permission));
}

// Check if user has all permissions
export function hasAllPermissions(
  permissions: Permission[],
  user: User,
): boolean {
  return permissions.every((permission) => user.role.includes(permission));
}

// Check permission for specific subject and action
export function canPerform(
  subject: Subject,
  action: Action,
  user: User,
): boolean {
  // Special case: if user has superuser, they can do anything
  if (user.role.includes("superuser")) {
    return true;
  }

  // Check each permission the user has
  for (const permission of user.role) {
    const allowedActions = permissionMap[permission];

    // Check if any of the allowed actions match the requested subject and action
    const canDo = allowedActions.some((allowed) => {
      // Exact match
      if (
        allowed.subject === subject &&
        (allowed.action === action || allowed.action === "manage")
      ) {
        return true;
      }
      return false;
    });

    if (canDo) return true;
  }

  return false;
}
