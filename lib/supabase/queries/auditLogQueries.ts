import "server-only";
// Audit log queries — append-only, Admin read access only
// Write path: always called within a database transaction, not directly from API
export const auditLogQueries = {
  list: async (_filters: Record<string, unknown>) => [],
  writeEntry: async (_entry: Record<string, unknown>) => null,
};
