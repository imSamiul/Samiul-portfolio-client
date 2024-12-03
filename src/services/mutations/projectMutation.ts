import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNewProject, updateShowOnHomePage } from "../projectApis";

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
