// Base fetch wrapper — all API calls go through this
// Handles: auth headers, error normalization, 401 redirect
export interface ApiError {
  code: "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "SERVER_ERROR";
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Phase 2: Implement with auth token injection and error handling
  return { data: null, error: null };
}
