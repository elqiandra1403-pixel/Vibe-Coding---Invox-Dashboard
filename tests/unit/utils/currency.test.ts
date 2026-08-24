import { describe, it, expect } from "vitest";
import { formatCurrency, convertCurrency, parseAmount, formatCompactCurrency } from "@/utils/currency";

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

  it("handles custom exchange rates", () => {
    const customRates = { USD: 1.0, EUR: 0.8, GBP: 0.7, IDR: 15000 };
    expect(convertCurrency(100, "USD", "EUR", customRates)).toBe(80);
    expect(convertCurrency(100, "USD", "IDR", customRates)).toBe(1500000);
  });

  it("handles lowercase and padded currency codes", () => {
    expect(convertCurrency(1200, " usd ", " idr ")).toBe(19200000);
  });

  it("handles invalid or zero amounts gracefully", () => {
    expect(convertCurrency(0, "USD", "EUR")).toBe(0);
    expect(convertCurrency(NaN, "USD", "EUR")).toBe(0);
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

  it("handles lowercase or space-padded currency codes", () => {
    expect(formatCurrency(1200, " usd ")).toBe("$1,200.00");
  });

  it("handles NaN amount gracefully", () => {
    expect(formatCurrency(NaN, "USD")).toBe("$0.00");
  });
});

describe("formatCompactCurrency", () => {
  it("formats USD compact amounts correctly", () => {
    expect(formatCompactCurrency(1200, "USD")).toBe("$1.2k");
    expect(formatCompactCurrency(1500000, "USD")).toBe("$1.5M");
    expect(formatCompactCurrency(750, "USD")).toBe("$750");
    expect(formatCompactCurrency(0, "USD")).toBe("$0");
  });

  it("formats IDR compact amounts correctly", () => {
    expect(formatCompactCurrency(1200, "IDR")).toBe("Rp19.2Jt");
    expect(formatCompactCurrency(100000, "IDR")).toBe("Rp1.6M");
    expect(formatCompactCurrency(0, "IDR")).toBe("Rp0");
  });

  it("handles negative amounts in compact formatting", () => {
    expect(formatCompactCurrency(-1200, "USD")).toBe("-$1.2k");
  });
});

describe("parseAmount", () => {
  it("parses string amounts", () => {
    expect(parseAmount("$1,500.00")).toBe(1500);
    expect(parseAmount("Rp19.200.000")).toBe(19200000);
  });

  it("parses numbers directly", () => {
    expect(parseAmount(1500)).toBe(1500);
    expect(parseAmount(0)).toBe(0);
  });

  it("handles empty or invalid inputs gracefully", () => {
    expect(parseAmount("")).toBe(0);
    expect(parseAmount("abc")).toBe(0);
    expect(parseAmount(NaN)).toBe(0);
  });

  it("parses negative amounts correctly", () => {
    expect(parseAmount("-$1,500.00")).toBe(-1500);
    expect(parseAmount("-Rp19.200.000")).toBe(-19200000);
  });
});
