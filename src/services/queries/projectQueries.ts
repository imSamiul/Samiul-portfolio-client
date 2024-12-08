import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getProjectById } from "../projectApis";
import { ProjectType } from "../../types/ProjectType";

export function useGetAllProjects() {
  return useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });
}

export function useGetProjectById(projectId: string) {
  return useQuery<ProjectType>({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
  });
}
