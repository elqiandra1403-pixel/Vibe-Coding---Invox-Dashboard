import "server-only";
import { Role } from "@/features/auth/types";

// Permission matrix: feature → allowed roles
export const PERMISSIONS = {
  invoices: { read: ["admin", "finance", "client"] as Role[], write: ["admin", "finance"] as Role[] },
  customers: { read: ["admin", "finance"] as Role[], write: ["admin", "finance"] as Role[] },
  payments: { read: ["admin", "finance"] as Role[], write: ["admin", "finance"] as Role[] },
  analytics: { read: ["admin", "finance"] as Role[], write: [] as Role[] },
  reports: { read: ["admin", "finance"] as Role[], write: [] as Role[] },
  settings: { read: ["admin"] as Role[], write: ["admin"] as Role[] },
  subscription: { read: ["admin"] as Role[], write: ["admin"] as Role[] },
  "audit-log": { read: ["admin"] as Role[], write: [] as Role[] },
  notifications: { read: ["admin", "finance", "client"] as Role[], write: [] as Role[] },
} as const;
