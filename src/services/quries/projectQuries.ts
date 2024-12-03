import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../projectApis";

export function useGetAllProjects() {
  return useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });
}
