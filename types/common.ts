// Shared utility types used across features
export interface DateRange {
  from: string;
  to: string;
}

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export interface PaginationConfig {
  page: number;
  limit: number;
}

export type Currency = string; // ISO 4217 code
