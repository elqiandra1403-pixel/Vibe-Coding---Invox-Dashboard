import { z } from "zod";

export const recordPaymentSchema = z.object({
  invoice_id: z.string().uuid(),
  amount: z.number().positive("Amount must be > 0"),
  method: z.enum(["bank_transfer", "cash", "check", "other"]),
  payment_date: z.string().refine((d) => !isNaN(Date.parse(d))),
  note: z.string().optional(),
});

export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;
