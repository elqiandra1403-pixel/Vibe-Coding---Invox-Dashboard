import { describe, it, expect } from "vitest";
import { createInvoiceSchema } from "@/features/invoices/validators";

describe("createInvoiceSchema", () => {
  it("requires at least one line item", () => {
    const result = createInvoiceSchema.safeParse({
      customer_id: "00000000-0000-0000-0000-000000000001",
      issue_date: "2024-01-01",
      due_date: "2024-01-31",
      line_items: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects due_date before issue_date", () => {
    const result = createInvoiceSchema.safeParse({
      customer_id: "00000000-0000-0000-0000-000000000001",
      issue_date: "2024-02-01",
      due_date: "2024-01-01",
      line_items: [{ description: "Service", quantity: 1, unit_price: 100 }],
    });
    expect(result.success).toBe(false);
  });
});
