import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createNewProject,
  deleteProject,
  updateProject,
  updateShowOnHomePage,
} from "../projectApis";
import { ProjectType } from "../../types/ProjectType";

// Create a new project
export function useCreateNewProject() {
  return useMutation({
    mutationFn: (formData: FormData) => createNewProject(formData),
  });
}
export function useUpdateShowOnHomePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => updateShowOnHomePage(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      formData,
    }: {
      projectId: string;
      formData: ProjectType;
    }) => updateProject(projectId, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
  });
}
