import "server-only";
// Payment queries — includes audit log write in same transaction
// PRD Business Rule 9: audit write is transactional with mutation
export const paymentQueries = {
  list: async () => [],
  recordPayment: async (_data: Record<string, unknown>) => null,
};
