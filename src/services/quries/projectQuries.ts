import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllProjects, getProjectById } from "../projectApis";

export function useGetAllProjects() {
  return useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });
}

export function useGetProjectById(projectId: string) {
  return queryOptions({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
  });
}
