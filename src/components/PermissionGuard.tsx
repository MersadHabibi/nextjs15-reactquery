import { usePermissions } from "@/hooks/usePermissions";
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/permissions/hasPermission";
import { type Permission } from "@/types/auth";
import { type ReactNode } from "react";

interface PermissionGuardProps {
  permission: Permission | Permission[];
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean;
}

export function PermissionGuard({
  permission,
  children,
  fallback = null,
  requireAll = false,
}: PermissionGuardProps) {
  const { user } = usePermissions();

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
