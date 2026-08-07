export type AuditAction =
  | "invoice.created"
  | "invoice.updated"
  | "invoice.deleted"
  | "invoice.sent"
  | "invoice.cancelled"
  | "invoice.status_changed"
  | "payment.recorded"
  | "customer.created"
  | "customer.updated"
  | "customer.archived";

export interface AuditLogEntry {
  id: string;
  org_id: string;
  actor_id: string;
  actor_email: string;
  action: AuditAction;
  entity_type: "invoice" | "payment" | "customer";
  entity_id: string;
  before_state?: Record<string, unknown>;
  after_state?: Record<string, unknown>;
  occurred_at: string;
}

export interface AuditLogFilters {
  actor_id?: string;
  entity_type?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
}
