export type PaymentMethod = "bank_transfer" | "cash" | "check" | "other";

export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  method: PaymentMethod;
  payment_date: string;
  note?: string;
  recorded_by: string;
  created_at: string;
}

export interface RecordPaymentInput {
  invoice_id: string;
  amount: number;
  method: PaymentMethod;
  payment_date: string;
  note?: string;
}
