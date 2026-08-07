import { Role } from "@/types/auth";

// Feature-level permission matrix
// Note: This is UI-level only — server enforces independently via lib/auth/permissions.ts
export const PERMISSIONS: Record<string, { read: Role[]; write: Role[] }> = {
  invoices:     { read: ["admin", "finance", "client"], write: ["admin", "finance"] },
  customers:    { read: ["admin", "finance"],           write: ["admin", "finance"] },
  payments:     { read: ["admin", "finance"],           write: ["admin", "finance"] },
  analytics:    { read: ["admin", "finance"],           write: [] },
  reports:      { read: ["admin", "finance"],           write: [] },
  settings:     { read: ["admin"],                      write: ["admin"] },
  subscription: { read: ["admin"],                      write: ["admin"] },
  "audit-log":  { read: ["admin"],                      write: [] },
  notifications: { read: ["admin", "finance", "client"], write: [] },
};
