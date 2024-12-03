import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../projectApis";

export function useGetAllProjects() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allProjects"],
    queryFn: getAllProjects,
  });
  return { data, error, isLoading };
}
