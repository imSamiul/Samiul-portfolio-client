import { useQuery } from "@tanstack/react-query";
import { getAllProjectsForDashboard } from "../projectApis";
import { ProjectType } from "../../types/ProjectType";

export function useGetAllProjectsForDashboard() {
  return useQuery<ProjectType[]>({
    queryKey: ["allProjects"],
    queryFn: getAllProjectsForDashboard,
  });
}
