import axios, { type AxiosResponse } from 'axios';
import { z } from 'zod';

import {
  fieldIssueSchema,
  type ApiErrorResponse,
  type ApiSuccessResponse,
  type FieldIssue,
} from '@/shared';

/**
 * Every failure reaching a component is this shape, whatever went wrong. The
 * API sends 25+ distinct `code` values; keeping them means a caller can tell
 * "your session expired" from "the server broke" instead of showing one red
 * line for both.
 */
export class ApiRequestError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(
    message: string,
    code: string,
    status: number,
    details?: unknown,
  ) {
    super(message);
    this.name = 'ApiRequestError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  /** The `{ field, message }` pairs behind a 422, or `[]` for anything else. */
  get fieldIssues(): FieldIssue[] {
    const parsed = z.array(fieldIssueSchema).safeParse(this.details);

    return parsed.success ? parsed.data : [];
  }
}

/**
 * Unwraps the API envelope and validates the payload, so call sites deal with
 * parsed data and `ApiRequestError` only. Validating here is the point: a
 * contract change surfaces at the boundary with the field name in the message,
 * instead of as `undefined.map` somewhere in a component.
 */
export async function request<TSchema extends z.ZodType>(
  schema: TSchema,
  call: () => Promise<AxiosResponse<ApiSuccessResponse<unknown>>>,
): Promise<z.output<TSchema>> {
  let payload: unknown;

  try {
    payload = (await call()).data.data;
  } catch (error) {
    throw normalizeError(error);
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    throw new ApiRequestError(
      'The server sent something this app did not expect.',
      'RESPONSE_SHAPE_MISMATCH',
      0,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    );
  }

  return parsed.data;
}

function normalizeError(error: unknown) {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return new ApiRequestError(
      error instanceof Error ? error.message : 'Something went wrong',
      'UNKNOWN_ERROR',
      0,
    );
  }

  const payload = error.response?.data;

  if (!payload) {
    return new ApiRequestError(
      'Could not reach the server. Check your connection and try again.',
      'NETWORK_ERROR',
      0,
    );
  }

  return new ApiRequestError(
    payload.message,
    payload.code,
    error.response?.status ?? 0,
    payload.details,
  );
}
