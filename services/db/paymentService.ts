import { PaymentRow } from '@/types/database';
import { InvoiceService } from './invoiceService';

export interface RecordPaymentPayload {
  invoice_id: string;
  amount: number;
  currency_id: string;
  payment_date: string;
  payment_method: PaymentRow['payment_method'];
  reference_number?: string;
  notes?: string;
}

export class PaymentService {
  private static payments: PaymentRow[] = [];

  static async recordPayment(payload: RecordPaymentPayload): Promise<PaymentRow> {
    if (payload.amount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }

    const newPayment: PaymentRow = {
      id: `pay-${Date.now()}`,
      invoice_id: payload.invoice_id,
      amount: Number(payload.amount.toFixed(2)),
      currency_id: payload.currency_id,
      payment_date: payload.payment_date,
      payment_method: payload.payment_method,
      reference_number: payload.reference_number || null,
      notes: payload.notes || null,
      status: 'completed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.payments.push(newPayment);

    // Trigger invoice balance update
    await InvoiceService.applyPaymentToInvoice(payload.invoice_id, newPayment.amount);

    return newPayment;
  }

  static async getPaymentsByInvoice(invoiceId: string): Promise<PaymentRow[]> {
    return this.payments.filter(p => p.invoice_id === invoiceId);
  }
}
