export const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash",          label: "Cash" },
  { value: "check",         label: "Check" },
  { value: "other",         label: "Other" },
] as const;

export type PaymentMethodValue = typeof PAYMENT_METHODS[number]["value"];
