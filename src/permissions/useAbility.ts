import { useUser } from "@/services/queries/useUser";
import { canPerform } from "./hasPermission";
import { type Action, type Subject } from "./permission.types";
export function useAbility() {
  const { user } = useUser();

  const can = (action: Action, subject: Subject): boolean => {
    if (!user.data) return false;
    return canPerform(subject, action, user.data);
  };

  return { can };
}
