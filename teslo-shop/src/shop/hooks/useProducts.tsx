import { useQuery } from "@tanstack/react-query";
import { getProductAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const offset = (Number(page) - 1) * +limit;

  const sizes = searchParams.get("sizes") ?? "";
  const test = (searchParams.get("sizes") ?? "").split(",").filter(Boolean);

  return useQuery({
    queryKey: ["products", { offset, limit, sizes, gender }],
    queryFn: () =>
      getProductAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes: test.join(","),
        gender: gender ?? "",
      }),
    staleTime: 1000 * 60 * 5,
  });
};
