export interface ApiSuccessResponse<TData> {
  success: true;
  message: string;
  data: TData;
}

/**
 * What the API's `errorHandler` sends. `code` is the stable, machine-readable
 * half — `message` is written for humans and may be reworded at any time, so
 * branch on `code`. `details` carries `{ field, message }[]` for 422s.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code: string;
  details?: unknown;
  stack?: string;
}
