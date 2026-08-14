import { describe, it, expect } from 'vitest';
import { CurrencyService, SUPPORTED_CURRENCIES } from '@/services/db/currencyService';
import { CustomerService } from '@/services/db/customerService';
import { InvoiceService } from '@/services/db/invoiceService';
import { PaymentService } from '@/services/db/paymentService';

describe('Database Architecture & Repository Integration Tests', () => {
  it('1. Currency System — verifies USD, IDR, EUR, GBP supported currencies exist', async () => {
    const currencies = await CurrencyService.getAllCurrencies();
    expect(currencies.length).toBeGreaterThanOrEqual(4);

    const codes = currencies.map(c => c.code);
    expect(codes).toContain('USD');
    expect(codes).toContain('IDR');
    expect(codes).toContain('EUR');
    expect(codes).toContain('GBP');
  });

  it('2. Invoice Calculations — verifies exact financial math (subtotal, tax, total, amount_due)', async () => {
    const { invoice, items } = await InvoiceService.createInvoice({
      user_id: 'user-test-1',
      customer_id: 'cust-1',
      invoice_number: 'INV-TEST-001',
      currency_id: 'curr-usd',
      issue_date: '2026-08-14',
      due_date: '2026-08-28',
      discount: 50,
      tax_rate: 10, // 10% tax on (1000 - 50 = 950) => 95 tax
      items: [
        { description: 'Design Retainer', quantity: 2, unit_price: 500 } // subtotal = 1000
      ]
    });

    expect(items.length).toBe(1);
    expect(invoice.subtotal).toBe(1000.00);
    expect(invoice.discount).toBe(50.00);
    expect(invoice.tax).toBe(95.00);
    expect(invoice.total).toBe(1045.00);
    expect(invoice.amount_paid).toBe(0.00);
    expect(invoice.amount_due).toBe(1045.00);
  });

  it('3. Payment Deduction Test — verifies Invoice Total = $1,000, Payment = $400 results in amount_paid = $400 and amount_due = $600', async () => {
    const { invoice } = await InvoiceService.createInvoice({
      user_id: 'user-test-2',
      customer_id: 'cust-1',
      invoice_number: 'INV-TEST-002',
      currency_id: 'curr-usd',
      issue_date: '2026-08-14',
      due_date: '2026-08-28',
      items: [
        { description: 'Web Development Services', quantity: 1, unit_price: 1000 }
      ]
    });

    expect(invoice.total).toBe(1000.00);
    expect(invoice.amount_due).toBe(1000.00);

    const payment = await PaymentService.recordPayment({
      invoice_id: invoice.id,
      amount: 400.00,
      currency_id: 'curr-usd',
      payment_date: '2026-08-14',
      payment_method: 'bank_transfer',
      reference_number: 'REF-400-PAY'
    });

    expect(payment.amount).toBe(400.00);

    const updated = await InvoiceService.getInvoiceById('user-test-2', invoice.id);
    expect(updated).not.toBeNull();
    expect(updated?.invoice.amount_paid).toBe(400.00);
    expect(updated?.invoice.amount_due).toBe(600.00);
  });

  it('4. Multi-Currency Retention — verifies Invoice A (USD) and Invoice B (IDR) maintain distinct original currencies', async () => {
    const { invoice: invA } = await InvoiceService.createInvoice({
      user_id: 'user-multi-curr',
      customer_id: 'cust-1',
      invoice_number: 'INV-USD-100',
      currency_id: 'curr-usd',
      issue_date: '2026-08-14',
      due_date: '2026-08-28',
      items: [{ description: 'USD Consulting', quantity: 1, unit_price: 1000 }]
    });

    const { invoice: invB } = await InvoiceService.createInvoice({
      user_id: 'user-multi-curr',
      customer_id: 'cust-2',
      invoice_number: 'INV-IDR-200',
      currency_id: 'curr-idr',
      issue_date: '2026-08-14',
      due_date: '2026-08-28',
      items: [{ description: 'IDR Service Contract', quantity: 1, unit_price: 15000000 }]
    });

    expect(invA.currency_id).toBe('curr-usd');
    expect(invA.total).toBe(1000);

    expect(invB.currency_id).toBe('curr-idr');
    expect(invB.total).toBe(15000000);
  });

  it('5. Customer Isolation & Management — verifies user isolated CRUD operations', async () => {
    const created = await CustomerService.createCustomer('user-test-3', {
      name: 'Aperture Films',
      email: 'hello@aperture.com',
      phone: '+1 555-9999',
      company_name: 'Aperture Films LLC',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      country: 'USA',
      postal_code: '97477',
      tax_id: 'US-888777666',
      notes: 'Film production partner'
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe('Aperture Films');

    const customersUser3 = await CustomerService.getCustomers('user-test-3');
    expect(customersUser3.length).toBe(1);
    expect(customersUser3[0].name).toBe('Aperture Films');

    const customersUser4 = await CustomerService.getCustomers('user-test-4');
    expect(customersUser4.length).toBe(0);
  });
});
