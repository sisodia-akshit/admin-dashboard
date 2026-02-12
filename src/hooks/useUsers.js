import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/usersApi";

export const useUsers = ({ limit, page, search, sort, order }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", limit, page, search, sort, order],
    queryFn: ({ signal }) =>
      getUsers({
        page,
        limit,
        search,
        sort,
        order,
        signal,
      }),
    keepPreviousData: true,
  });

  return { data, isLoading, error };
};
