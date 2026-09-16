import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../projectApis";
import { ProjectType } from "../../types/ProjectType";

export function useGetAllProjects() {
  return useQuery<ProjectType[]>({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });
}
