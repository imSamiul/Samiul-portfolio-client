import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ApiRequestError, request } from './apiHelper';

function axiosFailure(status: number, data: unknown) {
  const config = { headers: new AxiosHeaders() };

  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', config, null, {
    status,
    statusText: '',
    headers: {},
    config,
    data,
  });
}

const ok = (data: unknown) =>
  Promise.resolve({
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: new AxiosHeaders() },
    data: { success: true as const, message: 'Done', data },
  });

describe('request', () => {
  it('unwraps the envelope and returns the parsed payload', async () => {
    const schema = z.object({ id: z.string() });

    await expect(request(schema, () => ok({ id: 'abc' }))).resolves.toEqual({
      id: 'abc',
    });
  });

  it('keeps the code and status, which a message alone would throw away', async () => {
    const call = () =>
      Promise.reject(
        axiosFailure(401, {
          success: false,
          message: 'Session expired',
          code: 'ACCESS_TOKEN_INVALID',
        }),
      );

    const error = await request(z.unknown(), call).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiRequestError);
    expect(error).toMatchObject({
      status: 401,
      code: 'ACCESS_TOKEN_INVALID',
      message: 'Session expired',
    });
  });

  it('exposes a 422\u2019s field issues so a form can place them', async () => {
    const call = () =>
      Promise.reject(
        axiosFailure(422, {
          success: false,
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: [{ field: 'message', message: 'Please keep it under 2000' }],
        }),
      );

    const error = (await request(z.unknown(), call).catch(
      (e: unknown) => e,
    )) as ApiRequestError;

    expect(error.fieldIssues).toEqual([
      { field: 'message', message: 'Please keep it under 2000' },
    ]);
  });

  it('reports an unreachable server separately from a rejected request', async () => {
    const config = { headers: new AxiosHeaders() };
    const call = () =>
      Promise.reject(
        new AxiosError('Network Error', 'ERR_NETWORK', config, null),
      );

    const error = await request(z.unknown(), call).catch((e: unknown) => e);

    expect(error).toMatchObject({ code: 'NETWORK_ERROR', status: 0 });
  });

  it('fails loudly when the payload does not match the contract', async () => {
    const schema = z.object({ id: z.string() });

    const error = (await request(schema, () => ok({ id: 42 })).catch(
      (e: unknown) => e,
    )) as ApiRequestError;

    expect(error.code).toBe('RESPONSE_SHAPE_MISMATCH');
    expect(error.fieldIssues.map((issue) => issue.field)).toEqual(['id']);
  });
});
