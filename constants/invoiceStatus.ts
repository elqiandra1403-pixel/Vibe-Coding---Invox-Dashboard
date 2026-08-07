import { InvoiceStatus } from "@/features/invoices/types";

export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, {
  label: string;
}> = {
  draft:     { label: "Draft" },
  pending:   { label: "Pending" },
  paid:      { label: "Paid" },
  overdue:   { label: "Overdue" },
  cancelled: { label: "Cancelled" },
};

// Valid status transitions (PRD state machine)
export const STATUS_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
  draft:     ["pending", "cancelled"],
  pending:   ["paid", "overdue", "cancelled"],
  overdue:   ["paid", "cancelled"],
  paid:      [],
  cancelled: [],
};
