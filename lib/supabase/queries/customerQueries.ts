import "server-only";
export const customerQueries = {
  list: async () => [],
  findById: async (_id: string) => null,
  create: async (_data: Record<string, unknown>) => null,
  update: async (_id: string, _data: Record<string, unknown>) => null,
};
