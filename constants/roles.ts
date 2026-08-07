import { Role } from "@/types/auth";

export const ROLES: Role[] = ["admin", "finance", "client"];

export const ROLE_LABELS: Record<Role, string> = {
  admin:   "Admin/Owner",
  finance: "Staff Finance",
  client:  "Client",
};

export const INVITABLE_ROLES: Role[] = ["finance", "client"];
