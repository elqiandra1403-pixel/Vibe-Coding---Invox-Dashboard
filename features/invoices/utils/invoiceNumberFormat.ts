// Format invoice number per PRD: {PREFIX}-{YYYY}-{0001}
export function formatInvoiceNumber(prefix: string, year: number, sequence: number): string {
  const paddedSeq = String(sequence).padStart(4, "0");
  return `${prefix}-${year}-${paddedSeq}`;
}
