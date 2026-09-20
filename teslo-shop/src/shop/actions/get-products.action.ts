import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/types/products.response";

export const getProductAction = async () => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

  console.log({ data });
  return data;
};
