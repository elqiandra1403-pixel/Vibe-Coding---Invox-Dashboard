import { describe, it, expect } from "vitest";
import { formatCurrency, convertCurrency, parseAmount } from "@/utils/currency";

describe("convertCurrency", () => {
  it("converts USD to IDR correctly (1200 USD -> 19,200,000 IDR)", () => {
    expect(convertCurrency(1200, "USD", "IDR")).toBe(19200000);
  });

  it("converts USD to EUR correctly (1200 USD -> 1104 EUR)", () => {
    expect(convertCurrency(1200, "USD", "EUR")).toBe(1104);
  });

  it("converts USD to GBP correctly (1200 USD -> 948 GBP)", () => {
    expect(convertCurrency(1200, "USD", "GBP")).toBe(948);
  });

  it("returns original amount when from and to currencies match", () => {
    expect(convertCurrency(1200, "USD", "USD")).toBe(1200);
    expect(convertCurrency(19200000, "IDR", "IDR")).toBe(19200000);
  });

  it("converts IDR back to USD accurately", () => {
    expect(convertCurrency(19200000, "IDR", "USD")).toBe(1200);
  });
});

describe("formatCurrency", () => {
  it("formats USD correctly", () => {
    expect(formatCurrency(1200, "USD")).toBe("$1,200.00");
  });

  it("formats IDR without decimals", () => {
    expect(formatCurrency(19200000, "IDR")).toBe("Rp19.200.000");
  });

  it("formats EUR correctly", () => {
    const formatted = formatCurrency(1104, "EUR");
    expect(formatted).toContain("1.104");
    expect(formatted).toContain("€");
  });

  it("formats GBP correctly", () => {
    expect(formatCurrency(948, "GBP")).toBe("£948.00");
  });
});

describe("parseAmount", () => {
  it("parses string amounts", () => {
    expect(parseAmount("$1,500.00")).toBe(1500);
    expect(parseAmount("Rp19.200.000")).toBe(19200000);
  });
});
