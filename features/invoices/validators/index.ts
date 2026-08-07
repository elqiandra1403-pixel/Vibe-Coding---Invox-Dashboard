import { z } from "zod";

const lineItemSchema = z.object({
  description: z.string().min(1, "Description required"),
  quantity: z.number().positive("Quantity must be > 0"),
  unit_price: z.number().min(0, "Unit price must be ≥ 0"),
});

export const createInvoiceSchema = z.object({
  customer_id: z.string().uuid(),
  issue_date: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  due_date: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  line_items: z.array(lineItemSchema).min(1, "At least one line item required"),
  discount: z.number().min(0).optional().default(0),
  tax_rate: z.number().min(0).max(100).optional().default(0),
  notes: z.string().optional(),
}).refine(
  (data) => new Date(data.due_date) >= new Date(data.issue_date),
  { message: "Due date must be ≥ issue date", path: ["due_date"] }
);

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
