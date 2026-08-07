export interface KpiData {
  outstanding_revenue: number;
  invoices_paid: number;
  average_payment_days: number | null;
  upcoming_payments: number;
  outstanding_delta: number;
  invoices_paid_delta: number;
  average_days_delta: number | null;
  upcoming_delta: number;
}

export interface ActivityItem {
  id: string;
  type: "sent" | "viewed" | "paid" | "overdue" | "reminder_sent";
  invoice_id: string;
  invoice_number: string;
  customer_name: string;
  amount?: number;
  occurred_at: string;
  actor?: string;
}
