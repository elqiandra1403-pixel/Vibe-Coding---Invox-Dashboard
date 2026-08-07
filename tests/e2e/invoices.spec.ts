import { test, expect } from "@playwright/test";

// PRD §27 sample test cases: create → send → mark paid
test.describe("Invoice Lifecycle", () => {
  test.beforeEach(async ({ page }) => {
    // Phase 2: Login as Finance user
  });

  test("creates invoice as Draft", async ({ page }) => {
    // Phase 2: Fill create invoice form, assert status=Draft
  });

  test("sends invoice changes status to Pending", async ({ page }) => {
    // Phase 2: Send draft invoice, assert status=Pending
  });

  test("recording full payment marks invoice as Paid", async ({ page }) => {
    // Phase 2: Record full payment, assert status=Paid, balance_due=0
  });
});
