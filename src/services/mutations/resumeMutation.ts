import { useMutation } from "@tanstack/react-query";

import { uploadResume } from "../resumeApis";

// Nothing to invalidate: the public download is a redirect resolved per request,
// not a cached query.
export function useUploadResume() {
  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
  });
}
