import { describe, it, expect } from "vitest";
import { computeTotals } from "@/features/invoices/utils/computeTotals";

describe("computeTotals", () => {
  it("computes subtotal from line items", () => {
    const result = computeTotals({
      line_items: [{ quantity: 2, unit_price: 100 }, { quantity: 1, unit_price: 50 }],
    });
    expect(result.subtotal).toBe(250);
  });

  it("applies discount before tax", () => {
    const result = computeTotals({
      line_items: [{ quantity: 1, unit_price: 1000 }],
      discount: 100,
      tax_rate: 10,
    });
    // subtotal=1000, discount=100, taxable=900, tax=90, total=990
    expect(result.tax_amount).toBe(90);
    expect(result.total).toBe(990);
  });

  it("handles zero tax and discount", () => {
    const result = computeTotals({
      line_items: [{ quantity: 3, unit_price: 50 }],
    });
    expect(result.subtotal).toBe(150);
    expect(result.discount).toBe(0);
    expect(result.tax_amount).toBe(0);
    expect(result.total).toBe(150);
  });
});
