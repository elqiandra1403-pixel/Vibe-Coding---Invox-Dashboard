// Global API response types
export interface ApiError {
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "SERVER_ERROR";
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    has_more: boolean;
  };
}

export interface ErrorResponse {
  error: ApiError;
}
