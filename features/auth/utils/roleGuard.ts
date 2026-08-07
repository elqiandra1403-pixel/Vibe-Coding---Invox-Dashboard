import { Role } from "@/features/auth/types";

// Returns true if the user's role has access to the resource
export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

export function isAdmin(role: Role): boolean {
  return role === "admin";
}

export function isFinanceOrAdmin(role: Role): boolean {
  return role === "admin" || role === "finance";
}
