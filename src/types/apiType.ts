// Every successful API response is wrapped like this; `message` is also what
// the error envelope carries, which getErrorMessage reads.
export type ApiResponse<TData> = {
  success: true;
  message: string;
  data: TData;
};
