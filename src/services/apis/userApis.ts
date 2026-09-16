import { z } from 'zod';

import { objectIdSchema } from '@/shared';
import type { LoginFormType } from '@/types/userType';

import { axiosInstance } from './axiosInstance';
import { request } from '../utils/apiHelper';

/** Matches the API's `toAuthUserDto` — id and email, never the password hash. */
const loginResultSchema = z.object({
  user: z.object({
    id: objectIdSchema,
    email: z.email(),
  }),
  token: z.string().min(1),
});

export const userApis = {
  // POST: sign in and receive the Bearer token
  login: (credentials: LoginFormType) =>
    request(loginResultSchema, () =>
      axiosInstance.post('/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
};
