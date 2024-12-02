import { useMutation } from "@tanstack/react-query";

import { createNewProject } from "../projectApis";

// Create a new project
export function useCreateNewProject() {
  return useMutation({
    mutationFn: (formData: FormData) => createNewProject(formData),
  });
}
