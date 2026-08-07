export type NotificationType =
  | "invoice_overdue"
  | "payment_recorded"
  | "invoice_viewed"
  | "invoice_sent"
  | "reminder_sent";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  entity_id: string;    // invoice_id, payment_id, etc.
  entity_type: string;
  is_read: boolean;
  created_at: string;
}
