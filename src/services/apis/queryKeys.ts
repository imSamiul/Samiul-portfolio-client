/**
 * One factory for every cache key, so a mutation can invalidate a whole domain
 * without call sites re-typing a literal. A typo in a literal is a silent
 * no-op invalidation; a typo here does not compile.
 */
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
  },
  projects: {
    all: ['projects'] as const,
    /**
     * The dashboard list, drafts included. Named after the route it calls, not
     * "allProjects" — the API's `getAllProjects` is the *public* list and hides
     * drafts, which made the old key name actively misleading.
     */
    dashboard: () => ['projects', 'dashboard'] as const,
  },
  resume: {
    all: ['resume'] as const,
  },
} as const;
