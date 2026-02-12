import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrders } from "../services/ordersApi";
import { useAuth } from "../context/AuthContext";
import { getBooks, getMyBooks } from "../services/booksApi";

export const useInventory = ({ page, limit, search, sort, order }) => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Books", page, search, sort, order],
    queryFn: ({ signal }) =>
      user?.role === "admin"
        ? getBooks({
            page,
            limit,
            search,
            sort,
            order,
            signal,
          })
        : getMyBooks({
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
