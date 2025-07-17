import { useUser } from "@/services/queries/useUser";
import { type ReactNode } from "react";
import {
  canPerform,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "./hasPermission";
import {
  type Action,
  type Permissions,
  type Subject,
} from "./permission.types";

interface CanProps {
  subject: Subject;
  action: Action;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuardBySubjectAndAction({
  subject,
  action,
  children,
  fallback = null,
}: CanProps) {
  const { user } = useUser();

  if (!user.data) {
    return null;
  }

  const allowed = canPerform(subject, action, user.data);

  return allowed ? <>{children}</> : <>{fallback}</>;
}

interface PermissionGuardProps {
  permission: Permissions | Permissions[];
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean;
}

export function PermissionGuardByRole({
  permission,
  children,
  fallback = null,
  requireAll = false,
}: PermissionGuardProps) {
  const { user } = useUser();

  if (user.isLoading) {
    return null;
  }

  if (!user.data) {
    return null;
  }

  const hasAccess = Array.isArray(permission)
    ? requireAll
      ? hasAllPermissions(permission, user.data)
      : hasAnyPermission(permission, user.data)
    : hasPermission(permission, user.data);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
