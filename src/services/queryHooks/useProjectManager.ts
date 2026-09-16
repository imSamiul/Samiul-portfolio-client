'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiRequestError } from '../utils/apiHelper';
import { projectApis } from '../apis/projectApis';
import { queryKeys } from '../apis/queryKeys';

/**
 * Everything the dashboard does to a project. One hook keeps the invalidation
 * in a single place: the API also revalidates the public pages on its own, so
 * these keys only cover the dashboard's own cache.
 */
export function useProjectManager({
  shouldFetch = true,
}: { shouldFetch?: boolean } = {}) {
  const queryClient = useQueryClient();

  const invalidateProjects = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });

  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: projectsFetchError,
  } = useQuery({
    queryKey: queryKeys.projects.dashboard(),
    queryFn: projectApis.getAllForDashboard,
    enabled: shouldFetch,
  });

  const {
    mutate: createProject,
    isPending: isCreatingProject,
    error: createProjectError,
  } = useMutation({
    mutationFn: projectApis.create,
    onSuccess: invalidateProjects,
  });

  const {
    mutate: updateProject,
    isPending: isUpdatingProject,
    error: updateProjectError,
  } = useMutation({
    mutationFn: projectApis.update,
    onSuccess: invalidateProjects,
  });

  const {
    mutate: toggleHomepage,
    isPending: isTogglingHomepage,
    error: toggleHomepageError,
  } = useMutation({
    mutationFn: projectApis.toggleHomepage,
    onSuccess: invalidateProjects,
  });

  const {
    mutate: toggleStatus,
    isPending: isTogglingStatus,
    error: toggleStatusError,
  } = useMutation({
    mutationFn: projectApis.toggleStatus,
    onSuccess: invalidateProjects,
  });

  const {
    mutate: deleteProject,
    isPending: isDeletingProject,
    error: deleteProjectError,
  } = useMutation({
    mutationFn: projectApis.remove,
    onSuccess: invalidateProjects,
  });

  return {
    // Data
    projects: projects ?? [],

    // Loading states
    isLoadingProjects,
    isCreatingProject,
    isUpdatingProject,
    isTogglingHomepage,
    isTogglingStatus,
    isDeletingProject,

    // Errors
    projectsFetchError: projectsFetchError as ApiRequestError | null,
    createProjectError,
    updateProjectError,
    toggleHomepageError,
    toggleStatusError,
    deleteProjectError,

    // Actions
    createProject,
    updateProject,
    toggleHomepage,
    toggleStatus,
    deleteProject,

    // Invalidation
    invalidateProjects,
  };
}
