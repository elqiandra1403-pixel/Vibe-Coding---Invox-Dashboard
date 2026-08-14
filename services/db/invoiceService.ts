import { InvoiceRow, InvoiceItemRow, InvoiceStatusHistoryRow } from '@/types/database';

export interface CreateInvoicePayload {
  user_id: string;
  customer_id: string;
  invoice_number: string;
  currency_id: string;
  issue_date: string;
  due_date: string;
  discount?: number;
  tax_rate?: number;
  notes?: string;
  payment_terms?: string;
  items: Array<{
    product_id?: string;
    description: string;
    quantity: number;
    unit_price: number;
    discount?: number;
    tax?: number;
  }>;
}

export class InvoiceService {
  private static invoices: InvoiceRow[] = [];
  private static invoiceItems: InvoiceItemRow[] = [];
  private static statusHistory: InvoiceStatusHistoryRow[] = [];

  static async createInvoice(payload: CreateInvoicePayload): Promise<{ invoice: InvoiceRow; items: InvoiceItemRow[] }> {
    const existing = this.invoices.find(
      inv => inv.user_id === payload.user_id && inv.invoice_number === payload.invoice_number
    );
    if (existing) {
      throw new Error(`Invoice number ${payload.invoice_number} already exists for this user`);
    }

    let subtotal = 0;
    const itemsToCreate: InvoiceItemRow[] = [];
    const invoiceId = `inv-${Date.now()}`;

    payload.items.forEach((item, idx) => {
      const qty = Number(item.quantity) || 1;
      const price = Number(item.unit_price) || 0;
      const disc = Number(item.discount) || 0;
      const itemTax = Number(item.tax) || 0;

      const itemSubtotal = Number((qty * price).toFixed(2));
      const itemTotal = Number((itemSubtotal - disc + itemTax).toFixed(2));
      subtotal += itemSubtotal;

      itemsToCreate.push({
        id: `item-${invoiceId}-${idx + 1}`,
        invoice_id: invoiceId,
        product_id: item.product_id || null,
        description: item.description,
        quantity: qty,
        unit_price: price,
        discount: disc,
        tax: itemTax,
        subtotal: itemSubtotal,
        total: itemTotal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });

    const discountAmount = Number(payload.discount || 0);
    const taxRate = Number(payload.tax_rate || 0);
    const taxableSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = Number(((taxableSubtotal * taxRate) / 100).toFixed(2));
    const total = Number((taxableSubtotal + taxAmount).toFixed(2));
    const amountPaid = 0;
    const amountDue = total;

    const newInvoice: InvoiceRow = {
      id: invoiceId,
      user_id: payload.user_id,
      customer_id: payload.customer_id,
      invoice_number: payload.invoice_number,
      currency_id: payload.currency_id,
      issue_date: payload.issue_date,
      due_date: payload.due_date,
      subtotal: Number(subtotal.toFixed(2)),
      discount: discountAmount,
      tax: taxAmount,
      total: total,
      amount_paid: amountPaid,
      amount_due: amountDue,
      status: 'pending',
      notes: payload.notes || null,
      payment_terms: payload.payment_terms || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.invoices.push(newInvoice);
    this.invoiceItems.push(...itemsToCreate);

    this.statusHistory.push({
      id: `hist-${Date.now()}`,
      invoice_id: invoiceId,
      previous_status: null,
      new_status: 'pending',
      changed_by: payload.user_id,
      changed_at: new Date().toISOString(),
    });

    return { invoice: newInvoice, items: itemsToCreate };
  }

  static async getInvoices(userId: string, filters?: { status?: string; currency_id?: string; customer_id?: string }): Promise<InvoiceRow[]> {
    return this.invoices.filter(inv => {
      if (inv.user_id !== userId) return false;
      if (filters?.status && inv.status !== filters.status) return false;
      if (filters?.currency_id && inv.currency_id !== filters.currency_id) return false;
      if (filters?.customer_id && inv.customer_id !== filters.customer_id) return false;
      return true;
    });
  }

  static async getInvoiceById(userId: string, id: string): Promise<{ invoice: InvoiceRow; items: InvoiceItemRow[] } | null> {
    const invoice = this.invoices.find(inv => inv.id === id && inv.user_id === userId);
    if (!invoice) return null;

    const items = this.invoiceItems.filter(item => item.invoice_id === id);
    return { invoice, items };
  }

  static async updateInvoiceStatus(userId: string, id: string, newStatus: InvoiceRow['status']): Promise<InvoiceRow | null> {
    const invoice = this.invoices.find(inv => inv.id === id && inv.user_id === userId);
    if (!invoice) return null;

    const prevStatus = invoice.status;
    invoice.status = newStatus;
    invoice.updated_at = new Date().toISOString();

    this.statusHistory.push({
      id: `hist-${Date.now()}`,
      invoice_id: id,
      previous_status: prevStatus,
      new_status: newStatus,
      changed_by: userId,
      changed_at: new Date().toISOString(),
    });

    return invoice;
  }

  static async applyPaymentToInvoice(invoiceId: string, paymentAmount: number): Promise<InvoiceRow | null> {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return null;

    const newAmountPaid = Number((invoice.amount_paid + paymentAmount).toFixed(2));
    const newAmountDue = Number(Math.max(0, invoice.total - newAmountPaid).toFixed(2));

    invoice.amount_paid = newAmountPaid;
    invoice.amount_due = newAmountDue;
    invoice.updated_at = new Date().toISOString();

    if (newAmountDue === 0) {
      const prevStatus = invoice.status;
      invoice.status = 'paid';

      this.statusHistory.push({
        id: `hist-${Date.now()}`,
        invoice_id: invoiceId,
        previous_status: prevStatus,
        new_status: 'paid',
        changed_by: invoice.user_id,
        changed_at: new Date().toISOString(),
      });
    }

    return invoice;
  }
}
