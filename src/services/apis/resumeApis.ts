import { apiUrl } from '@/lib/env';
import { resumeMetaSchema, type ResumeMeta } from '@/shared';

import { axiosInstance } from './axiosInstance';
import { ApiRequestError, request } from '../utils/apiHelper';

/**
 * Downloading needs no JavaScript: the endpoint answers 302 to a Cloudinary URL
 * that already carries `Content-Disposition: attachment`, so a plain anchor is
 * enough and the browser handles the save itself.
 */
export const RESUME_DOWNLOAD_URL = apiUrl('/resume/download');

export const resumeApis = {
  // GET: when the resume was last replaced, or `null` when none is stored.
  // "Nothing uploaded yet" is a state the dashboard renders, not an error.
  meta: async (): Promise<ResumeMeta | null> => {
    try {
      return await request(resumeMetaSchema, () =>
        axiosInstance.get('/resume'),
      );
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },

  // POST: replace the stored PDF. The API uploads to Cloudinary and moves the
  // `SiteAsset` pointer, so no redeploy is involved.
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    return request(resumeMetaSchema, () =>
      axiosInstance.post('/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    );
  },
};
