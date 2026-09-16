import { z } from 'zod';

import type { ContactFormValues } from '@/shared';

import { axiosInstance } from './axiosInstance';
import { request } from '../utils/apiHelper';

export const contactApis = {
  // POST: email the message. Nothing is stored; the API forwards it via Resend.
  sendMessage: (message: ContactFormValues) =>
    request(z.null(), () => axiosInstance.post('/contact', message)),
};
