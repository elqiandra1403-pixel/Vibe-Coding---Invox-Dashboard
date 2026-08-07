import { z } from "zod";

export const orgSettingsSchema = z.object({
  name: z.string().min(1, "Organization name required"),
  currency: z.string().length(3, "Must be a valid ISO 4217 code"),
  invoice_prefix: z.string().min(1).max(10).regex(/^[A-Za-z0-9]+$/, "Alphanumeric only"),
});

export const inviteUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["finance", "client"]),
  customer_id: z.string().uuid().optional(), // required for client role
});

export type OrgSettingsInput = z.infer<typeof orgSettingsSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
