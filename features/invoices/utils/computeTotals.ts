import { LineItem } from "@/features/invoices/types";

interface TotalsInput {
  line_items: Pick<LineItem, "quantity" | "unit_price">[];
  discount?: number;
  tax_rate?: number;
}

interface TotalsResult {
  subtotal: number;
  discount: number;
  tax_amount: number;
  total: number;
}

/**
 * Server-authoritative total computation.
 * PRD Business Rule 3: total = subtotal − discount + tax
 * NEVER called from client-side components — only called in API routes.
 */
export function computeTotals(input: TotalsInput): TotalsResult {
  const subtotal = input.line_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );
  const discount = input.discount ?? 0;
  const tax_amount = ((subtotal - discount) * (input.tax_rate ?? 0)) / 100;
  const total = subtotal - discount + tax_amount;
  return { subtotal, discount, tax_amount, total };
}
