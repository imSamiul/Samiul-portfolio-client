import { toast } from 'sonner';

import { ApiRequestError } from '@/services/utils/apiHelper';

/**
 * A 422 already renders against the fields it names, so toasting it as well
 * would say the same thing twice. Everything else has nowhere to land but a
 * toast.
 */
export function toastUnlessFieldIssues(error: Error) {
  if (error instanceof ApiRequestError && error.fieldIssues.length > 0) {
    return;
  }

  toast.error(error.message);
}
