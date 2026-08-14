-- Invox Multi-Currency & Complete Schema Migration
-- Version: 002
-- Extends 001_initial_schema.sql with currencies, products, tax_rates, invoice_items, invoice_status_history, RLS, and indexes

-- 1. Currencies Table
CREATE TABLE IF NOT EXISTS currencies (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code           VARCHAR(3) UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  symbol         TEXT NOT NULL,
  decimal_places INT NOT NULL DEFAULT 2,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed Initial Currencies
INSERT INTO currencies (code, name, symbol, decimal_places, is_active)
VALUES 
  ('USD', 'US Dollar', '$', 2, true),
  ('IDR', 'Indonesian Rupiah', 'Rp', 0, true),
  ('EUR', 'Euro', '€', 2, true),
  ('GBP', 'British Pound', '£', 2, true)
ON CONFLICT (code) DO UPDATE 
SET name = EXCLUDED.name, symbol = EXCLUDED.symbol, decimal_places = EXCLUDED.decimal_places;

-- 2. Alter Users Table to reference Currencies
ALTER TABLE users ADD COLUMN IF NOT EXISTS default_currency_id UUID REFERENCES currencies(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;

-- 3. Products / Services Table
CREATE TABLE IF NOT EXISTS products (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  description    TEXT,
  sku            TEXT,
  unit           TEXT DEFAULT 'item',
  default_price  NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (default_price >= 0),
  currency_id    UUID REFERENCES currencies(id),
  tax_rate       NUMERIC(5,2) DEFAULT 0.00 CHECK (tax_rate BETWEEN 0 AND 100),
  is_active      BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tax Rates Table
CREATE TABLE IF NOT EXISTS tax_rates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  rate        NUMERIC(5,2) NOT NULL CHECK (rate BETWEEN 0 AND 100),
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Alter Invoices Table for Multi-Currency & Financial Accuracy
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS currency_id UUID REFERENCES currencies(id);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_terms TEXT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS amount_paid NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (amount_paid >= 0);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS amount_due NUMERIC(18,2) GENERATED ALWAYS AS (total - amount_paid) STORED;

-- 6. Invoice Items Table (mapping detailed invoice line items)
CREATE TABLE IF NOT EXISTS invoice_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id  UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity    NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
  unit_price  NUMERIC(18,2) NOT NULL CHECK (unit_price >= 0),
  discount    NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (discount >= 0),
  tax         NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (tax >= 0),
  subtotal    NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (subtotal >= 0),
  total       NUMERIC(18,2) NOT NULL DEFAULT 0.00 CHECK (total >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Invoice Status History Table
CREATE TABLE IF NOT EXISTS invoice_status_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id      UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status      TEXT NOT NULL,
  changed_by      UUID REFERENCES users(id),
  changed_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Alter Payments Table to reference Currencies
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency_id UUID REFERENCES currencies(id);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending','completed','failed','refunded'));
ALTER TABLE payments ADD COLUMN IF NOT EXISTS reference_number TEXT;

-- 9. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(org_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(billing_email);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(org_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);

-- 10. Enable Row Level Security (RLS) on all core tables
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Currencies: Public Read Policy
CREATE POLICY "Currencies are readable by authenticated users" 
  ON currencies FOR SELECT 
  TO authenticated 
  USING (true);

-- Users: Read/Write own user profile
CREATE POLICY "Users can access own profile" 
  ON users FOR ALL 
  TO authenticated 
  USING (id = auth.uid());

-- Customers: Tenant Isolation
CREATE POLICY "Users can access own customers" 
  ON customers FOR ALL 
  TO authenticated 
  USING (org_id IN (SELECT org_id FROM users WHERE id = auth.uid()));

-- Invoices: Tenant Isolation
CREATE POLICY "Users can access own invoices" 
  ON invoices FOR ALL 
  TO authenticated 
  USING (org_id IN (SELECT org_id FROM users WHERE id = auth.uid()));

-- Products: Tenant Isolation
CREATE POLICY "Users can access own products" 
  ON products FOR ALL 
  TO authenticated 
  USING (user_id = auth.uid());

-- Payments: Tenant Isolation
CREATE POLICY "Users can access own payments" 
  ON payments FOR ALL 
  TO authenticated 
  USING (org_id IN (SELECT org_id FROM users WHERE id = auth.uid()));
