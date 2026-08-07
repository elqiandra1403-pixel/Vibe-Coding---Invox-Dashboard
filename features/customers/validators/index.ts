import { z } from "zod";

export const createCustomerSchema = z.object({
  company_name: z.string().min(1).max(200, "Max 200 characters"),
  billing_email: z.string().email("Valid email required"),
  phone: z.string().regex(/^[\d\s\+\-]+$/, "Phone: digits, +, spaces, dashes only").optional(),
  country: z.string().optional(),
  address: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
