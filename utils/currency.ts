// Currency formatting utility — uses org currency setting
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function parseAmount(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
}
