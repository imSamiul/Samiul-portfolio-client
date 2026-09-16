'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiRequestError } from '../utils/apiHelper';
import { resumeApis } from '../apis/resumeApis';
import { queryKeys } from '../apis/queryKeys';

/**
 * The public download is a redirect resolved per request, so only the metadata
 * is cached here — enough for the dashboard to say whether a resume exists.
 */
export function useResumeManager() {
  const queryClient = useQueryClient();

  const {
    data: resume,
    isLoading: isLoadingResume,
    error: resumeFetchError,
  } = useQuery({
    queryKey: queryKeys.resume.all,
    queryFn: resumeApis.meta,
  });

  const {
    mutate: uploadResume,
    isPending: isUploadingResume,
    error: uploadResumeError,
  } = useMutation({
    mutationFn: resumeApis.upload,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.resume.all }),
  });

  return {
    // Data
    resume: resume ?? null,

    // Loading states
    isLoadingResume,
    isUploadingResume,

    // Errors
    resumeFetchError: resumeFetchError as ApiRequestError | null,
    uploadResumeError,

    // Actions
    uploadResume,
  };
}
