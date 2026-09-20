import { useQuery } from "@tanstack/react-query";
import { getProductAction } from "../actions/get-products.action";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductAction,
    staleTime: 1000 * 60 * 5,
  });
};
