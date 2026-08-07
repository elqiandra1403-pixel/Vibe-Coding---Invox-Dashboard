import { describe, it, expect } from "vitest";
import { formatCurrency, parseAmount } from "@/utils/currency";

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(1500, "USD")).toBe("$1,500.00");
  });
});

describe("parseAmount", () => {
  it("parses string amounts", () => {
    expect(parseAmount("$1,500.00")).toBe(1500);
  });
});
