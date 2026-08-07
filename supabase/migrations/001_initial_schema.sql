-- Invox Initial Schema
-- Version: 001
-- Phase 2: Implement full schema per PRD §20 Data Model and §21 ERD

-- Organizations
CREATE TABLE IF NOT EXISTS organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  logo_url    TEXT,
  currency    CHAR(3) NOT NULL DEFAULT 'USD',
  invoice_prefix TEXT NOT NULL DEFAULT 'INV' CHECK (invoice_prefix ~ '^[A-Za-z0-9]{1,10}$'),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id      UUID NOT NULL REFERENCES organizations(id),
  email       TEXT NOT NULL,
  full_name   TEXT,
  role        TEXT NOT NULL CHECK (role IN ('admin', 'finance', 'client')),
  customer_id UUID,  -- FK to customers (set for client role)
  is_active   BOOLEAN NOT NULL DEFAULT true,
  invited_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id           UUID NOT NULL REFERENCES organizations(id),
  company_name     TEXT NOT NULL CHECK (length(company_name) <= 200),
  billing_email    TEXT NOT NULL,
  phone            TEXT,
  country          TEXT,
  address          TEXT,
  portal_user_id   UUID REFERENCES users(id),
  is_archived      BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id         UUID NOT NULL REFERENCES organizations(id),
  invoice_number TEXT NOT NULL,
  customer_id    UUID NOT NULL REFERENCES customers(id),
  status         TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pending','paid','overdue','cancelled')),
  issue_date     DATE NOT NULL,
  due_date       DATE NOT NULL CHECK (due_date >= issue_date),
  subtotal       NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount       NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  tax_rate       NUMERIC(5,2)  NOT NULL DEFAULT 0 CHECK (tax_rate BETWEEN 0 AND 100),
  tax_amount     NUMERIC(12,2) NOT NULL DEFAULT 0,
  total          NUMERIC(12,2) NOT NULL DEFAULT 0,
  balance_due    NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes          TEXT,
  sent_at        TIMESTAMPTZ,
  paid_at        TIMESTAMPTZ,
  created_by     UUID REFERENCES users(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, invoice_number)
);

-- Line Items
CREATE TABLE IF NOT EXISTS line_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id  UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity    NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
  unit_price  NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  amount      NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  sort_order  INT NOT NULL DEFAULT 0
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id   UUID NOT NULL REFERENCES invoices(id),
  org_id       UUID NOT NULL REFERENCES organizations(id),
  amount       NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  method       TEXT NOT NULL CHECK (method IN ('bank_transfer','cash','check','other')),
  payment_date DATE NOT NULL,
  note         TEXT,
  recorded_by  UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit Logs (append-only)
CREATE TABLE IF NOT EXISTS audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id       UUID NOT NULL REFERENCES organizations(id),
  actor_id     UUID REFERENCES users(id),
  actor_email  TEXT NOT NULL,
  action       TEXT NOT NULL,
  entity_type  TEXT NOT NULL CHECK (entity_type IN ('invoice','payment','customer')),
  entity_id    UUID NOT NULL,
  before_state JSONB,
  after_state  JSONB,
  occurred_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES organizations(id),
  user_id     UUID NOT NULL REFERENCES users(id),
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  entity_id   UUID,
  entity_type TEXT,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id         UUID NOT NULL UNIQUE REFERENCES organizations(id),
  plan_tier      TEXT NOT NULL DEFAULT 'starter',
  seats_used     INT NOT NULL DEFAULT 0,
  seats_limit    INT NOT NULL DEFAULT 5,
  billing_cycle  TEXT NOT NULL DEFAULT 'monthly',
  status         TEXT NOT NULL DEFAULT 'active',
  next_billing_date DATE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Phase 2: Add RLS policies, indexes, and triggers
