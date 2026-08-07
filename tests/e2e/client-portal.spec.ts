import { test, expect } from "@playwright/test";

// PRD F11: Client portal RLS scoping
test.describe("Client Portal", () => {
  test.beforeEach(async ({ page }) => {
    // Phase 2: Login as Client user
  });

  test("client sees only their own invoices", async ({ page }) => {
    // PRD §27 test case 4: Client user sees only customer-scoped invoices
  });

  test("client cannot access another customer invoice by ID", async ({ page }) => {
    // PRD §27 test case 4: Direct URL access → 403
  });
});
