import "server-only";
import { Role, UserProfile } from "@/features/auth/types";

// Throw 403 if user's role is not in allowedRoles
export function requireRole(user: UserProfile, allowedRoles: Role[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new Error("FORBIDDEN");
  }
}
