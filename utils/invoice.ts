import { InvoiceStatus } from "@/features/invoices/types";
import { STATUS_TRANSITIONS } from "@/constants/invoiceStatus";

// PRD Business Rule 2: only Draft invoices are fully editable
export function isInvoiceEditable(status: InvoiceStatus): boolean {
  return status === "draft";
}

// Check if a status transition is valid per the PRD state machine
export function canTransitionTo(from: InvoiceStatus, to: InvoiceStatus): boolean {
  return STATUS_TRANSITIONS[from].includes(to);
}
